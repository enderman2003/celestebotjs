import { paginationEmbed } from 'discordjs-button-pagination';

import { EmbedBuilder , ButtonBuilder, ButtonStyle } from 'discord.js';

export function v() {
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


  pages = [
	embed1,
	embed2,
	//....
	//embedN
  ];



  buttonList = [
    button1,
    button2
  ]


  paginationEmbed(interaction, pages, buttonList, timeout);
}
