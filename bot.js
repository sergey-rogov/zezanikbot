const { Telegraf } = require('telegraf');
const { Op } = require('sequelize');


const MESSAGES = require('./messages');
const { getCashFloat } = require('./cashFloat');
const { User } = require('./db');

const failIfNotAuthorized = (adminUsernames, chat) => {
  if (!adminUsernames.includes(chat.username)) throw new Error('not-allowed');
};

const withAuthorization = (adminUsernames) => (handler) => async (ctx) => {
  try {
    const chat = await ctx.getChat();
    failIfNotAuthorized(adminUsernames, chat);

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

const greet = async (ctx, chat) => {
  const [user] = await User.findOrCreate({
    where: {
      username: chat.username,
    },
  });
  user.setDataValue('chatId', chat.id);
  await user.save();

  ctx.reply(MESSAGES.start(chat));
};

const subscribe = async (ctx, chat) => {
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

const unsubscribe = async (ctx, chat) => {
  const { username, id: chatId } = chat;

  try {
    await User.update({
      subscribed: false,
    }, {
      where: {
        username,
        chatId,
      },
    });
    ctx.reply(MESSAGES.unsubscribed);
  } catch (e) {
    ctx.reply(MESSAGES.somethingWentWrong)
  }
};

const reportCashFloat = async (ctx) => {
  const cashFloat = await getCashFloat();
  MESSAGES.cashFloatReport(cashFloat).forEach(message => ctx.reply(message));
};

const start = async (botToken, adminUsernames) => {
  const bot = new Telegraf(botToken);
  const authorized = withAuthorization(adminUsernames);

  bot.command('start', authorized(greet));
  bot.command('subscribe', authorized(subscribe));
  bot.command('unsubscribe', authorized(unsubscribe));
  bot.command('cashFloat', authorized(reportCashFloat));
  bot.command('help', ctx => ctx.reply(MESSAGES.help));

  bot.launch();

  return {
    sendMessage: async (message) => {
      const subscribers = await User.findAll({
        where: {
          subscribed: true,
          chatId: {
            [Op.ne]: null,
          },
        },
      }, { raw: true });
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
    },
  };
};

module.exports = start;
