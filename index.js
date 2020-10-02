const startBot = require('./bot');
const startServer = require('./server');
const { setCashFloat } = require('./cashFloat');

const port = process.env.PORT || 80;
const botToken = process.env.BOT_TOKEN;
const adminUsername = process.env.ADMIN_USERNAME;

if (!botToken) throw new Error('Bot token is not specified');
if (!adminUsername) throw new Error('Admin username is not specified');

const start = async () => {
  console.log('Starting...');

  const bot = await startBot(botToken, adminUsername);
  console.log('Bot started.')

  startServer({
    port,
    sendMessage: (message) => bot.sendMessage(message),
    onCashFloatReport: (salespointId, amount) => setCashFloat(salespointId, amount),
  });
  console.log('Server started.');
};

start();
