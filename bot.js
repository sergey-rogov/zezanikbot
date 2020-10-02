const { Telegraf } = require('telegraf');

const MESSAGES = require('./messages');
const { getCashFloat } = require('./cashFloat');

let notificationsChatId;

const failIfNotAuthorized = (adminUsername, chat) => {
  if (chat.username !== adminUsername) throw new Error('not-allowed');
};
const authorize = (adminUsername, chat) => {
  failIfNotAuthorized(adminUsername, chat);
  notificationsChatId = chat.id;
};

const withAuthorization = (adminUsername) => (handler) => async (ctx) => {
  try {
    const chat = await ctx.getChat();
    failIfNotAuthorized(adminUsername, chat);

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
  authorize(adminUsername, chat);
  ctx.reply(MESSAGES.help(chat));
};

const reportCashFloat = (ctx) => {
  const cashFloat = getCashFloat();
  ctx.reply(MESSAGES.cashFloatReport(cashFloat));
};

const start = async (botToken, adminUsername) => {
  const bot = new Telegraf(botToken);
  const authorized = withAuthorization(adminUsername);

  bot.command('start', authorized(greet));
  bot.command('cashFloat', authorized(reportCashFloat));

  return {
    sendMessage: (message) => bot.telegram.sendMessage(notificationsChatId, message),
  };
};

module.exports = start;
