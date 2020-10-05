const { Telegraf } = require('telegraf');

const MESSAGES = require('./messages');
const { getCashFloat } = require('./cashFloat');

const notificationsChatIds = new Set();

const failIfNotAuthorized = (adminUsername, chat) => {
  if (!admingUsernames.includes(chat.username)) throw new Error('not-allowed');
};
const useChatForNotifications = (chat) => {
  notificationsChatIds.add(chat.id);
};

const withAuthorization = (admingUsernames) => (handler) => async (ctx) => {
  try {
    const chat = await ctx.getChat();
    failIfNotAuthorized(admingUsernames, chat);

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

const greet = (ctx, chat) => {
  useChatForNotifications(chat);
  ctx.reply(MESSAGES.help(chat));
};

const reportCashFloat = async (ctx) => {
  const cashFloat = await getCashFloat();
  ctx.reply(MESSAGES.cashFloatReport(cashFloat));
};

const start = async (botToken, admingUsernames) => {
  const bot = new Telegraf(botToken);
  const authorized = withAuthorization(admingUsernames);

  bot.command('start', authorized(greet));
  bot.command('cashFloat', authorized(reportCashFloat));
  bot.command('help', ctx => ctx.reply('No one will help one here'));

  bot.launch();

  return {
    sendMessage: async (message) => {
      const chatIds = [...notificationsChatIds.values()];
      for (const chatId of chatIds) {
        try {
          await bot.telegram.sendMessage(chatId, message);
        } catch (e) {
          console.log('An error arose while sending a message. Chat id will be deleted');
          console.error(e);
          notificationsChatIds.delete(chatId);
        }
      }
    },
  };
};

module.exports = start;
