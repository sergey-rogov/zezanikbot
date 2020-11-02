import startBot from './bot';
import startServer from './server';
import { setCashFloat } from './cashFloat';

import config from './config';

const port = config.PORT;
const botToken = config.BOT_TOKEN;
const apiAuthToken = config.API_AUTH_TOKEN;
const adminUsername = config.ADMIN_USERNAME;

if (!botToken) throw new Error('Bot token is not specified');
if (!adminUsername) throw new Error('Admin username is not specified');

const adminUsernames = adminUsername.split(',').map(username => username.trim());

const start = async () => {
  console.log('Starting...');

  const bot = await startBot(botToken, adminUsernames);
  console.log('Bot started.')

  startServer({
    port,
    authToken: apiAuthToken,
    sendMessage: (message) => bot.sendMessage(message),
    onCashFloatReport: (salespointId, amount) => setCashFloat(salespointId, amount),
  });
  console.log('Server started.');
};

start();
