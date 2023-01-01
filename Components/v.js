import { pagination, TypesButtons, StylesButton } from '@devraelfreeze/discordjs-pagination';

import { EmbedBuilder , ButtonBuilder, ButtonStyle } from 'discord.js';

export function v() {
  await pagination({
    interaction: interaction,
    embeds: arrayEmbeds, // Array of embeds objects
    author: interaction.member.user,
    time: 40000, // 40 seconds
    fastSkip: false,
    disableButtons: true,
    pageTravel: false,
    /** Enable buttons pagination system only for member with ID: 123456789 */
    customFilter: (interaction) => {
        return interaction.member.user.id === '123456789';
    },
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
