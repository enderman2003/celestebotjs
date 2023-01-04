import { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType } from 'discord.js';
export function v(msg, pages) {
  let page = 0;
  const row = new ActionRowBuilder()
           .addComponents(
		new ButtonBuilder()
			.setCustomId('nextbtn')
			.setLabel('Next')
			.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
			.setCustomId('prevbtn')
			.setLabel('Previous')
			.setStyle(ButtonStyle.Primary),
	   );
  const currPage = msg.reply({ embeds: [pages[page]], components: [row] })
  const filter = (b) => ["nextbtn", "prevbtn"].includes(b.id)
  const col = msg.channel.createMessageCollector({ componentType: ComponentType.Button,  time: 20000 })

  col.on("collect", button => {
    if (button.member.id !== msg.author.id) {
      return
    }
    if (button.id == "prevbtn") {
      page = page > 0 ? --pages : pages.length - 1   
      button.deferUpdate()
    }
    else if(button.id == "nextbtn") {
      button.deferUpdate()
      page = page + 1 < page.length ? page++ : 0;
    }
    currPage.editReply({ embeds: [pages[page]], components: [row] }) 
  });
}
