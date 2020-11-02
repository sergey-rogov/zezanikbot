import type { TelegrafContext } from 'telegraf/typings/context';
import type { Chat } from 'telegraf/typings/telegram-types';

import MESSAGES from '../../messages';

const withAuthorization = (adminUsernames: string[]) =>
  (handler: (ctx: TelegrafContext, chat: Chat) => Promise<void>) =>
    async (ctx: TelegrafContext) => {
      try {
        const chat = await ctx.getChat();

        if (!adminUsernames.includes(chat.username)) throw new Error('not-allowed');

        handler(ctx, chat);
      } catch (e) {
        if (e.message === 'not-allowed') {
          ctx.reply(MESSAGES.adminUsernameMismatch);
        } else {
          console.error(e);
          ctx.reply(MESSAGES.somethingWentWrong);
        }
      }
    };

export default withAuthorization;
