import type { TelegrafContext } from 'telegraf/typings/context';
import type { Chat as TelegramChat } from 'telegraf/typings/telegram-types';

import MESSAGES from '../../messages';
import { Chat } from '../../db';

const createGreetCommand = () => async (ctx: TelegrafContext, chat: TelegramChat) => {
  const botUsername = ctx.botInfo.username;
  const userUsername = chat.username;

  const [ch] = await Chat.findOrCreate({
    where: {
      userUsername,
      botUsername,
    },
  });

  ch.setDataValue('chatId', chat.id);
  ch.setDataValue('subscribed', true);

  await ch.save();

  ctx.reply(MESSAGES.start(chat));
};

export default createGreetCommand;
