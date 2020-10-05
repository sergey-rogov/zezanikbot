const { Sequelize, DataTypes } = require('sequelize');

const dbURL = process.env.DATABASE_URL;
if (!dbURL) throw new Error('DB connection url is not defined');

const sequelize = new Sequelize(dbURL);

sequelize.sync().then(() => console.log('DB in sync'));

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatId: {
    type: DataTypes.INTEGER,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

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

module.exports = { User, CashFloat };
