import { createClient } from '@supabase/supabase-js'
import { get_globals, set_globals, auction_timer } from "../Global/globals.js"
import { Client, EmbedBuilder, GatewayIntentBits, userMention } from "discord.js"
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = process.env.WAIFU_CHANNEL
var gen_desc = "Gen 1"
var rarity_color = 0xb3b3b3

export async function ha(message, client) {
  if(get_globals('auctionProcess') == 'false') { 
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
            if(data[j].name.substring(0, 4) == "gen2") { gen_desc = "Gen2"; rarity_color = 0x57ffa5; }
            break;
          }
        }
      }
    }
    else { set_globals('imgHash', data[Math.floor(Math.random() * data.length) + 1].name) }
    console.log(get_globals('imgHash'))
    var auctionEmbed = new EmbedBuilder()
    .setColor(rarity_color)
    .setTitle('Auction Started')
    .setDescription(`For today's auction we have this beauty`)
    .setImage('https://dxflwfledezyinanacmg.supabase.co/storage/v1/object/public/animenft/' + get_globals('imgHash'))
    .setFooter({ text: gen_desc })

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
