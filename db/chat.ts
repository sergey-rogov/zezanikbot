import type { Optional } from 'sequelize';
import { DataTypes, Model } from 'sequelize';

import sequelize from './instance';


interface ChatAttributes {
  id: number;
  userUsername: string;
  botUsername: string;
  chatId: number | null;
  subscribed?: boolean;
};

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: number;
  public userUsername!: string;
  public botUsername!: string;
  public chatId!: number | null;
  public subscribed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  botUsername: {
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
  tableName: 'Chats',
});

export default Chat;
