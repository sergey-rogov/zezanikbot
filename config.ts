import { config } from 'dotenv';

interface Config {
  PORT: number;
  BOT_TOKEN: string;
  API_AUTH_TOKEN: string;
  ADMIN_USERNAME: string;
  DATABASE_URL: string;
}

const c: Config = <Config> <unknown> config().parsed;

c.PORT = Number(c.PORT);

if (typeof c.PORT !== 'number') throw new Error('PORT is not a number');
if (typeof c.BOT_TOKEN !== 'string') throw new Error('BOT_TOKEN is not a string');
if (typeof c.API_AUTH_TOKEN !== 'string') throw new Error('API_AUTH_TOKEN is not a string');
if (typeof c.ADMIN_USERNAME !== 'string') throw new Error('ADMIN_USERNAME is not a string');
if (typeof c.DATABASE_URL !== 'string') throw new Error('DATABASE_URL is not a string');

export default c;
