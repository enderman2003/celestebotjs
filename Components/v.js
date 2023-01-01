import { pagination, TypesButtons, StylesButton } from '@devraelfreeze/discordjs-pagination';

import { EmbedBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export async function v(msg) {
  var embed1 = new EmbedBuilder()
  .setTitle("Test")
  .setDescription()
  var embed2 = new EmbedBuilder()
  .setTitle("Test")
  .setDescription()
  var arrayEmbeds = [
    embed1,
    embed2
  ]
  await pagination({
    embeds: arrayEmbeds, // Array of embeds objects
    author: msg.author,
    time: 30000, // 30 seconds
    fastSkip: false,
    disableButtons: true,
    pageTravel: false,
    
    buttons: [
        {
            value: TypesButtons.previous,
            label: 'Previous Page',
            style: StylesButton.Success,
            emoji: '⏮️'
        },
        {
            value: TypesButtons.next,
            label: 'Next Page',
            style: StylesButton.Success,
            emoji: '⏭️' // Disable emoji for this button
        }
     ]
  });
}
