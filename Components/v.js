const paginationEmbed = require('discordjs-button-pagination');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { EmbedBuilder , ButtonBuilder, ButtonStyle } = require('discord.js');
const embed1 = new EmbedBuilder()
                .setTitle('First Page')
                .setDescription('This is the first page');

const embed2 = new EmbedBuilder()
                .setTitle('Second Page')
                .setDescription('This is the second page');

const button1 = new ButtonBuilder()
                .setCustomId('previousbtn')
                .setLabel('Previous')
                .setStyle(ButtonStyle.Primary);

const button2 = new ButtonBuilder()
                .setCustomId('nextbtn')
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary);

// Create an array of embeds
pages = [
	embed1,
	embed2,
	//....
	//embedN
];

//create an array of buttons

buttonList = [
    button1,
    button2
]


// Call the paginationEmbed method, first three arguments are required
// timeout is the time till the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
paginationEmbed(interaction, pages, buttonList, timeout);
