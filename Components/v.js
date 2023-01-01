import { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
export async function v(msg, pages) {
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
  const currPage = msg.channel.send({ embeds: [pages[page]], component: row })
  const filter = (b) => ["nextbtn", "prevbtn"].includes(b.id)
  const col = await currPage.createButtonCollector(filter, { time: 20000 })

  col.on("collect", button => {
    button.reply.defer()
    if (button.clicker.user.id !== msg.author.id) {
      return
    }
    if (button.id == "prevbtn") {
      page = page > 0 ? --pages : pages.length - 1   
    }
    else if(button.id == "nextbtn") {
      page = page + 1 < page.length ? page++ : 0;
    }
    currPage.edit({ embeds: [pages[page]], component: row }) 
  });
}
