import { CashFloat } from '../db';

const setCashFloat = async (salespointId: string, amount: string) => {
  try {
    const prev = await CashFloat.findOne({ where: { salespointId } });
    if (prev) {
      prev.setDataValue('amount', amount);
      await prev.save();
    } else {
      await CashFloat.create({ salespointId, amount });
    }
  } catch (e) {
    console.error(e);
    throw new Error('Can\'t save to db');
  }
};

export default setCashFloat;
