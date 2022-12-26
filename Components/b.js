const _supabase = require('@supabase/supabase-js')
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js")
const SUPABASE_URL = 'https://dxflwfledezyinanacmg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Zmx3ZmxlZGV6eWluYW5hY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2OTczMzksImV4cCI6MTk4NTI3MzMzOX0.2aWmdFYDY_SBTMwNT1zeOGv-R_5uuBZEoVS9RxNCNaI'
// Create a single supabase client for interacting with your database
const supabase = _supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = "1056425420746141708"
var bidderId = 0

module.exports = {
    name: "b",
    description: "Bids against other user",
    async execute(message, args, client) {
        const { data, error } = await supabase.auth.getSession()
        if(error==null && bidderId != message.author.id){
            bidderId = message.author.id
            registerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Bid Placed Successfully')
            .setDescription('Bid of' + args[0] + ' has been placed successfully by' + message.author.username)

            channel = await client.channels.fetch(WAIFU_CHANNEL)
            channel.send({ embeds: [registerEmbed] })
        }
        else if (args[0] < 0 || args[0] == null){
            errEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Forbidden 403')
            .setDescription('Forbidden 403. Invalid amount input')

            channel = await client.channels.fetch(WAIFU_CHANNEL)
            channel.send({ embeds: [errEmbed] })
        }
        else{
            errEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Unauthorized 402')
            .setDescription('Unauthorized 402. You aren not allowed to bid')

            channel = await client.channels.fetch(WAIFU_CHANNEL)
            channel.send({ embeds: [errEmbed] })
        }
    }
}
