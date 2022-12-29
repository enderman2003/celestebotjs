import { EmbedBuilder } from "discord.js"
import { get_globals, set_globals, bid_timer } from "../Global/globals.js"
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://dxflwfledezyinanacmg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Zmx3ZmxlZGV6eWluYW5hY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2OTczMzksImV4cCI6MTk4NTI3MzMzOX0.2aWmdFYDY_SBTMwNT1zeOGv-R_5uuBZEoVS9RxNCNaI'
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = "1056425420746141708"

export async function b(message, args, client) {
    if (get_globals("auctionProcess") === 'true') {
        const { data, error } = await supabase.auth.getSession()
        if(error==null && get_globals("bidderId") != message.author.id){
            if (args[0] < 0 || args[0] == null){
                var errEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Forbidden 403')
                .setDescription('Forbidden 403. Invalid amount input')

                channel = await client.channels.fetch(WAIFU_CHANNEL)
                channel.send({ embeds: [errEmbed] })
                return true
            }
            set_globals('bidderId', message.author.id)
            var registerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Bid Placed Successfully')
            .setDescription('Bid of ' + args[0] + ' :coin: has been placed successfully by ' + message.author.username)

            var channel = await client.channels.fetch(WAIFU_CHANNEL)
            channel.send({ embeds: [registerEmbed] })
            bid_timer()
            while(get_globals('bidWon') === 'false') {
                if (get_globals('bidWon') === 'true') {
                    const { dat, err } = await supabase
                    .from('Discord minigame')
                    .update({ 'claimed_waifus': [get_globals('imgHash')] })
                    var wonEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Bid Won')
                    .setDescription(`Congratulations for winning the bid \n ${get_globals('bidAmt')} :coin: has been deducted successfully` + message.author.username)
                    .setImage('https://dxflwfledezyinanacmg.supabase.co/storage/v1/object/public/animenft/' + get_globals('imgHash'))
                    .setFooter({ text: message.author.username });

                    set_globals('imgHash', '')

                    var channel = await client.channels.fetch(WAIFU_CHANNEL)
                    channel.send({ embeds: [wonEmbed] })
               }
          }
        }
        else{
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
