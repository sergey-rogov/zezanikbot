import type { TelegrafContext } from 'telegraf/typings/context';
import type { Chat as TelegramChat } from 'telegraf/typings/telegram-types';

import MESSAGES from '../../messages';
import { Chat } from '../../db';

const createUnsubscribeCommand = () => async (ctx: TelegrafContext, chat: TelegramChat) => {
  const botUsername = ctx.botInfo.username;
  const userUsername = chat.username;

  try {
    await Chat.update({
      subscribed: false,
    }, {
      where: {
        userUsername,
        botUsername,
      },
    });
    ctx.reply(MESSAGES.unsubscribed);
  } catch (e) {
    ctx.reply(MESSAGES.somethingWentWrong)
  }
};

export default createUnsubscribeCommand;
