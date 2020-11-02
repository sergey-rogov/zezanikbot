import type { TelegrafContext } from 'telegraf/typings/context';
import type { Chat } from 'telegraf/typings/telegram-types';

import MESSAGES from '../../messages';
import { User } from '../../db';

const createGreetCommand = () => async (ctx: TelegrafContext, chat: Chat) => {
  const [user] = await User.findOrCreate({
    where: {
      username: chat.username,
    },
  });
  user.setDataValue('chatId', chat.id);
  await user.save();

  ctx.reply(MESSAGES.start(chat));
};

export default createGreetCommand;
