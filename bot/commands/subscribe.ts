import type { TelegrafContext } from 'telegraf/typings/context';
import type { Chat } from 'telegraf/typings/telegram-types';

import MESSAGES from '../../messages';
import { User } from '../../db';

const createSubscribeCommand = () => async (ctx: TelegrafContext, chat: Chat) => {
  const { username, id: chatId } = chat;

  try {
    await User.update({
      subscribed: true,
    }, {
      where: {
        username,
        chatId,
      },
    });
    ctx.reply(MESSAGES.subscribed);
  } catch (e) {
    ctx.reply(MESSAGES.somethingWentWrong)
  }
};

export default createSubscribeCommand;
