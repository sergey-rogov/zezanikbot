import startServer from './server';
import { setCashFloat } from './cashFloat';

import config from './config';
import startBots from './bots';

const configs = config.BOT_TOKENS.map((token) => ({
  token,
  adminUsernames: config.ADMIN_USERNAMES,
}))

const start = async () => {
  console.log('Starting...');

  const bots = await startBots(configs);
  console.log('Bot started.')

  startServer({
    port: config.PORT,
    authTokens: config.API_AUTH_TOKENS,
    sendMessage: (authToken, message) => {
      const botIndex = config.API_AUTH_TOKENS.indexOf(authToken);
      if (botIndex === -1) throw new Error(`No bot found for auth token "${authToken}"`);
      const botToken = config.BOT_TOKENS[botIndex];
      bots.sendMessage(botToken, message)
    },
    onCashFloatReport: (salespointId, amount) => setCashFloat(salespointId, amount),
  });
  console.log('Server started.');
};

start();
