import { pagination, TypesButtons, StylesButton } from '@devraelfreeze/discordjs-pagination';

import { EmbedBuilder , ButtonBuilder, ButtonStyle } from 'discord.js';

export function v() {
  await pagination({
    interaction: interaction,
    embeds: arrayEmbeds, // Array of embeds objects
    author: interaction.member.user,
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
            emoji: '⏩' // Disable emoji for this button
        }
     ]
  });
}
