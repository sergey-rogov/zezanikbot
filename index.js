const startBot = require('./bot');
const startServer = require('./server');
const { setCashFloat } = require('./cashFloat');

const port = process.env.PORT || 80;
const botToken = process.env.BOT_TOKEN;
let adminUsernames = process.env.ADMIN_USERNAME;

if (!botToken) throw new Error('Bot token is not specified');
if (!adminUsernames) throw new Error('Admin username is not specified');

admingUsernames = adminUsernames.split(',').map(username => username.trim());

const start = async () => {
  console.log('Starting...');

  const bot = await startBot(botToken, admingUsernames);
  console.log('Bot started.')

  startServer({
    port,
    sendMessage: (message) => bot.sendMessage(message),
    onCashFloatReport: (salespointId, amount) => setCashFloat(salespointId, amount),
  });
  console.log('Server started.');
};

start();
