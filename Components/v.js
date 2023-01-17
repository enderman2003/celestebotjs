import { Pagination } from "@acegoal07/discordjs-pagination";
import { ButtonBuilder } from 'discord.js';
export async function v(message, embeds){
  new Pagination().setPortal(message)
   .setPageList(embeds)
   .setButtonList([
      new ButtonBuilder()
         .setLabel(`Previous`)
         .setStyle("Secondary")
         .setCustomId(`1`),
      new ButtonBuilder()
         .setLabel(`Next`)
         .setStyle("Secondary")
         .setCustomId(`2`)
   ])
   .setTimeout(30000)
   .paginate()
}
