import type Telegraf from 'telegraf';
import type { TelegrafContext } from 'telegraf/typings/context';

import { Op } from 'sequelize';

import { User } from '../db';

const createSendMessageMethod = (bot: Telegraf<TelegrafContext>) => async (message: string) => {
  const subscribers = await User.findAll({
    where: {
      subscribed: true,
      chatId: {
        [Op.ne]: null,
      },
    },
    raw: true,
  });
  const chatIds = subscribers.map(s => s.chatId);

  if (chatIds.length === 0) {
    console.warn('No subscribers found');
    return;
  }

  for (const chatId of chatIds) {
    try {
      await bot.telegram.sendMessage(chatId, message);
    } catch (e) {
      console.log('An error arose while sending a message. Chat id will be deleted');
      console.error(e);
    }
  }
}

export default createSendMessageMethod;
