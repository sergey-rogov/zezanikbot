import type { Optional } from 'sequelize';
import { DataTypes, Model } from 'sequelize';

import sequelize from './instance';

interface CashFloatAttributes {
  id: number;
  salespointId: string;
  amount: string;
}

interface CashFloatCreationAttributes extends Optional<CashFloatAttributes, 'id'> {}

class CashFloat extends Model<CashFloatAttributes, CashFloatCreationAttributes> implements CashFloatAttributes {
  public id!: number;
  public salespointId!: string;
  public amount!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CashFloat.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  salespointId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  tableName: 'CashFloats',
});

export default CashFloat;
