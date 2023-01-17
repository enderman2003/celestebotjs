import { EmbedBuilder } from "discord.js"
import { get_globals, set_globals, bid_timer } from "../Global/globals.js"
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = process.env.WAIFU_CHANNEL

export async function b(message, args, client) {
    if (get_globals("auctionProcess") === 'true') {
        const { user, err } = await supabase
        .from("Discord minigame")
        .select("email")
        .eq("dis_id", message.author.id)
        if(user[0].email!==null && get_globals("bidderId") != message.author.id){
            if (args[0] < 0 || args[0] == null || args[0] <= get_globals('bidAmt')){
                var errEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Forbidden 403')
                .setDescription('Forbidden 403. Invalid amount input')
                
                channel = await client.channels.fetch(WAIFU_CHANNEL)
                channel.send({ embeds: [errEmbed] })
                return true
            }
            set_globals('bidderId', message.author.id)
            set_globals('bidAmt', parseInt(args[0]))
            var registerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Bid Placed Successfully')
            .setDescription('Bid of ' + args[0] + ' :coin: has been placed successfully by ' + message.author.username)

            var channel = await client.channels.fetch(WAIFU_CHANNEL)
            channel.send({ embeds: [registerEmbed] })
            bid_timer(message, client)
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
    else {
        message.reply("Auction has not started yet.")
    }
}
