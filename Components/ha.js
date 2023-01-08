import { createClient } from '@supabase/supabase-js'
import { get_globals, set_globals, auction_timer } from "../Global/globals.js"
import { Client, EmbedBuilder, GatewayIntentBits, userMention } from "discord.js"
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = process.env.WAIFU_CHANNEL
var j = 0

export async function ha(message, client) {
  const user = supabase.auth.session().user
  if(user!==null && get_globals('auctionProcess') == 'false') { 
    set_globals('auctionProcess', 'true')
    const { dat, err} = await supabase
    .from('Discord minigame')
    .select('claimed_waifus')
    const { data, error } = await supabase
    .storage
    .from('animenft')
    .list()
    if (dat != null) {
      for (const i in dat[0].claimed_waifus.waifus) {
        for (var j in data) {
          if (data[j].name != i[j]) {
            set_globals('imgHash', data[j].name)
            console.log(data[j].name)
            break;
          }
          j++
        }
      }
    }
    else { set_globals('imgHash', data[Math.floor(Math.random() * data.length) + 1].name) }
    console.log(get_globals('imgHash'))
    var auctionEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Auction Started')
    .setDescription("For today's auction we have this beauty")
    .setImage('https://dxflwfledezyinanacmg.supabase.co/storage/v1/object/public/animenft/' + get_globals('imgHash'))

    var channel = await client.channels.fetch(WAIFU_CHANNEL)
    channel.send({ embeds: [auctionEmbed] })
    
    auction_timer(client)
  }
  else {
      var errEmbed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('Unauthorized 402')
      .setDescription('Unauthorized 402. You aren not allowed to bid')

      var channel = await client.channels.fetch(WAIFU_CHANNEL)
      channel.send({ embeds: [errEmbed] })
  }
}
