import startBot from '../bot';

let botsByToken = {};

const startBots = async (config: {
  token: string;
  adminUsernames: string[];
}[]) => {
  for (const { token, adminUsernames } of config) {
    botsByToken[token] = await startBot(token, adminUsernames);
  }

  return {
    sendMessage: (token, message) => {
      const bot = botsByToken[token];
      if (!bot) throw new Error(`Bot not found for token "${token}"`);

      bot.sendMessage(message);
    },
  };
};

export default startBots;
