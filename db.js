const { Sequelize, DataTypes } = require('sequelize');

const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
});

sequelize.sync().then(() => console.log('DB in sync'));

const CashFloat = sequelize.define('CashFloat', {
  salespointId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = { CashFloat };
