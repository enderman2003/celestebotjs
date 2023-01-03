import { EmbedBuilder } from "discord.js"
import { get_globals, set_globals, bid_timer } from "../Global/globals.js"
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = "1056425420746141708"


export async function lb(message, client) {
  const rndInt = randomIntFromInterval(50, 350)
  const { data, error } = await supabase
    .from('Discord minigame')
    .select('*')
    .eq('dis_id', message.author.id.toString())
  
  var amount = data[0].amt + rndInt
    
  const { dat, err } = await supabase
    .from('Discord minigame')
    .update({ 'amt': amount })
    .eq('dis_id', message.author.id.toString())
    
  var wonEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Claimed Daily')
        .setDescription(`Claimed lootbox by ${message.author.username}. \nAmount ${rndInt} :coin: successfully credited. \nTotal Balance: ${data[0].amt} :coin:`)
        .setFooter({ text: message.author.username });
  
  var channel = await client.channels.fetch(WAIFU_CHANNEL)
  channel.send({ embeds: [wonEmbed] })
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
