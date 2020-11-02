import type { Optional } from 'sequelize';
import { DataTypes, Model } from 'sequelize';

import sequelize from './instance';


interface UserAttributes {
  id: number;
  username: string;
  chatId: number | null;
  subscribed?: boolean;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public chatId!: number | null;
  public subscribed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
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
  sequelize,
  timestamps: true,
  tableName: 'Users',
});

export default User;
