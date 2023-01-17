import { EmbedBuilder } from "discord.js"
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = process.env.WAIFU_CHANNEL

export async function bal(message, client) {
    const { data, error } = await supabase
      .from('Discord minigame')
      .select('*')
      .eq('dis_id', message.author.id.toString())
    var balEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Check Balance')
          .setDescription(`${message.author.username}. \nTotal Balance: ${data[0].amt} :coin:`)
          .setFooter({ text: message.author.username });

    var channel = await client.channels.fetch(WAIFU_CHANNEL)
    channel.send({ embeds: [balEmbed] })
}
