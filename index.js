import { regbid } from './Components/regbid.js'
import { b } from './Components/b.js'
import { ha } from './Components/ha.js'
import { v } from './Components/v.js'
import { createClient } from '@supabase/supabase-js'
import { bid_timer_end, auction_timer_end } from "./Global/globals.js"
import { Client, EmbedBuilder, GatewayIntentBits, userMention } from "discord.js"
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const Prefix = "C!"
const GREET_CHANNEL = "1056425420746141708"
const LEAVE_CHANNEL = "1056425420746141708"
  

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async msg => {
    if(!msg.content.startsWith(Prefix) || msg.author.bot) return;

    const args = msg.content.slice(Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
        case "regbid":
            regbid(msg, args, client)
            break;
        case "b":
            bid_timer_end()
	    auction_timer_end()
            b(msg, args, client)
            break;
	case "ha":
	    ha(msg, client)
	    break;
        case "v":
            const {data, error} = await supabase
            .from("Discord minigame")
            .select("claimed_waifus")
            .eq("dis_id", msg.author.id)
            console.log(data)
            var msgEmbed = []
            for(let i=0; i<=data[0].claimed_waifus.length; i++) {
              msgEmbed.push(new EmbedBuilder().setTitle("Claimed Assets").setImage("https://dxflwfledezyinanacmg.supabase.co/storage/v1/object/public/animenft/" + data[0].claimed_waifus[i]).setColor(0x0099FF))
            }
            v(msg, msgEmbed)
            break;
	default:	   
	    break;    
    }
});

client.on('guildMemberAdd', async member => {
    const { data, error } = await supabase
    .from('Gifs')
    .select('url')
    .eq('type', 'WELCOME')
    if (error != null){
        return true
    }
	console.log(data)
    var welcomeEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle('WELCOME')
	.setDescription(`
ˏˋ°•⁀➷
୨୧ ` + userMention(member.user.id) + ` Welcome new Owl🎐
*・✦ ⊹₊꒷˚૮₍｡• – •｡₎ა˚ ꒷꒦
ʚ🍧:Please read the rules‹3
⊹₊꒷︶︶꒷︶︶꒷꒦︶︶꒦‧🌸
ʚ💌ɞ _Read the rules at: ➷
ೃ༄--<#1005894981891920026>-
୨verify by doing Wick bots verification
which you can find underneath the rules !!!* ୨ 🍣
✦ ₊꒷꒦︶︶︶ ୨୧ ︶︶︶꒷꒦ෆ
ʚ💌ɞ _Chat at: ➷
₊·͟͟͞➳❥<#1006272345893240882>-
✦ ₊꒷꒦︶︶︶ ୨୧ ︶︶︶꒷꒦ෆ
ʚ💌ɞ _Selfroles at: ➷
・❥<#1005896784322773013>-
✦ ₊꒷꒦︶︶︶ ୨୧ ︶︶︶꒷꒦ෆ
ʚ💌ɞ _Introduction at: ➷
・❥<#1005931970007670845>-
︶︶꒷₊˚๑꒦🧁︶꒷꒦꒦︶꒷✦🍨
ʚ Hope you like it and have fun on our server! Feel at ease!꒷꒦🍭
୨ ╭ ୨୧ ✦ ︶꒷꒦・⎯⎯
┇・ ˎˊ Welcome to C e l e s t e <3
୨ ╰ ✦ ・⎯⎯・⎯⎯・꒷꒦ ♡ˎˊ˗
	`)
	.setImage(data[0].url[0])
	.setFooter({ text: member.user.username });

    var channel = await client.channels.fetch(GREET_CHANNEL)
	channel.send({ embeds: [welcomeEmbed] })
});

client.on('guildMemberRemove', async member => {
    const { data, error } = await supabase
    .from('Gifs')
    .select('url')
    .eq('type', 'LEAVE')
    if (error != null){
        return true
    }
    var goodbyeEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle('SAYONARA')
	.setDescription(`
୨🍡୧ *Goodbye, ` + userMention(member.user.id) + ` fellow scholar
˚꒷꒷︶₊˚૮₍｡• – •｡₎ა˚₊︶꒷꒷˚
I hope that one day you change your mind and come back to our server! 🍧๑ Well, now there's no way to go back... Now we'll have to go on without them! 🍭
꒷꒷︶₊˚૮₍｡• – •｡₎ა˚₊︶꒷꒷˚
    	`)
	.setImage(data[0].url[0])
	.setFooter({ text: member.user.username });

    var channel = await client.channels.fetch(LEAVE_CHANNEL)
    channel.send({ embeds: [goodbyeEmbed] })
});

client.login(process.env.DISCORD_TOKEN)
