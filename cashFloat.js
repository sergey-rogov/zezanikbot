const { CashFloat } = require('./db');


const setCashFloat = async (salespointId, amount) => {
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

const getCashFloat = async () => {
  const rows = await CashFloat.findAll();
  const report = [];
  for (const row of rows) {
    report.push({
      salespointId: row.salespointId,
      amount: row.amount,
      reportedAt: row.updatedAt,
    });
  }
  return report;
};

module.exports = {
  setCashFloat,
  getCashFloat,
};
