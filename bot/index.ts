import { Telegraf } from 'telegraf';

import MESSAGES from '../messages';

import withAuthorization from './auth';

import createGreetCommand from './commands/greet';
import createSubscribeCommand from './commands/subscribe';
import createUnsubscribeCommand from './commands/unsubscribe';
import createCashFloatCommand from './commands/cashFloat';
import createSendMessageMethod from './sendMessage';

const start = async (botToken: string, adminUsernames: string[]) => {
  const bot = new Telegraf(botToken);
  const authorized = withAuthorization(adminUsernames);

  bot.command('start', authorized(createGreetCommand()));
  bot.command('subscribe', authorized(createSubscribeCommand()));
  bot.command('unsubscribe', authorized(createUnsubscribeCommand()));
  bot.command('cashFloat', authorized(createCashFloatCommand()));
  bot.command('help', ctx => ctx.reply(MESSAGES.help));

  bot.launch();

  return {
    sendMessage: createSendMessageMethod(bot),
  };
};

export default start;
