import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from "discord.js"
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://dxflwfledezyinanacmg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Zmx3ZmxlZGV6eWluYW5hY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2OTczMzksImV4cCI6MTk4NTI3MzMzOX0.2aWmdFYDY_SBTMwNT1zeOGv-R_5uuBZEoVS9RxNCNaI'
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = "1056425420746141708"

export async function regbid(message, args, client) {
    const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('SignIn')
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://dxflwfledezyinanacmg.supabase.co/auth/v1/authorize?provider=discord")
    );
    var channel = await client.channels.fetch(WAIFU_CHANNEL)
    var msg = channel.send({ components: [button] })
    const { data, error } = await supabase
    .from('Discord minigame')
    .select('dis_id')
    .eq('dis_id', message.author.id.toString()) 
    console.log(data)
    if (data[0] == null) {
        const { error } = await supabase
        .from('Discord minigame')
        .insert({ 'dis_id': message.author.id.toString(), 'amt': 500, 'claimed_waifus': { 'waifus': [] } })
        console.log(error)
        if (error==null){
            var registerEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Registered Successfully')
            .setDescription('Your base data have been successfully registered. As reward we have transferred 200 :coin: to your acoount. In order to bid you need to press the above button. Enjoy!')

            var channel = await client.channels.fetch(WAIFU_CHANNEL)
            channel.send({ embeds: [registerEmbed] })
        }
    }
    else{
        var errEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Registered Already')
        .setDescription('Your base data have been already registered. In order to bid you need to press the above button.')

        var channel = await client.channels.fetch(WAIFU_CHANNEL)
        channel.send({ embeds: [errEmbed] })
    }
}
