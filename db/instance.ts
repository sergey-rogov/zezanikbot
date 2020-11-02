import { Sequelize } from 'sequelize';
import config from '../config';

const dbURL = config.DATABASE_URL;
if (!dbURL) throw new Error('DB connection url is not defined');

const sequelize = new Sequelize(dbURL);

sequelize.sync().then(() => console.log('DB in sync'));

export default sequelize;
