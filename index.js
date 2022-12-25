const fs = require('node:fs');
const path = require('node:path');
const {Client, EmbedBuilder, GatewayIntentBits, Collection } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const Prefix = "C!"
const commandFiles = fs.readdirSync('./Components/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Components/${file}`);
    client.commands.set(command.name, command);
}
  

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async msg => {
    if(!msg.content.startsWith(Prefix) || msg.author.bot) return;

    const args = msg.content.slice(Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'regbid'){
        client.commands.get('regbid').execute(msg, args, client);
    };
});

client.on('guildMemberAdd', member => {
    welcomeEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle('Some title')
	.setDescription('Some description here')
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    client.channels.get(`channelID`).send({ embeds: [welcomeEmbed] })
});

client.on('guildMemberRemove', member => {
    goodbyeEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle('Some title')
	.setDescription('Some description here')
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    client.channels.get(`channelID`).send({ embeds: [goodbyeEmbed] })
});

client.login("MTA1MTcyMjk3Mzk3Njk5Mzg1Mg.GoLeSF.aR8HN9iV3-mNaCF6lOu75SUwYxig54Frnjsf9w")