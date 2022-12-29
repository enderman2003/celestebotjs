import { createClient } from '@supabase/supabase-js'
import { get_globals, set_globals, auction_timer } from "../Global/globals.js"
import { Client, EmbedBuilder, GatewayIntentBits, userMention } from "discord.js"
const SUPABASE_URL = 'https://dxflwfledezyinanacmg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Zmx3ZmxlZGV6eWluYW5hY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2OTczMzksImV4cCI6MTk4NTI3MzMzOX0.2aWmdFYDY_SBTMwNT1zeOGv-R_5uuBZEoVS9RxNCNaI'
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = "1056425420746141708"

export async function ha(message, client) {
  const { data, error } = await supabase.auth.getSession()
  if(error==null) { 
    set_globals('auctionProcess', true)
    const { dat, err} = await supabase
    .from('Discord minigame')
    .select('claimed_waifus')
    const { data, error } = await supabase
    .storage
    .from('animenft')
    .list()
    for (claim_file in dat) {
      if (data.name != claim_file) {
        set_globals('imgHash', claimfile)
        console.log(claim_file)
        break;
      }
    }
    var auctionEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Auction Started')
    .setDescription("For today's auction we have this beauty")
    .setImage('https://dxflwfledezyinanacmg.supabase.co/storage/v1/object/public/animenft/' + get_globals('imgHash'))

    var channel = await client.channels.fetch(WAIFU_CHANNEL)
    channel.send({ embeds: [auctionEmbed] })
    
    auction_timer.timer_start()
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
