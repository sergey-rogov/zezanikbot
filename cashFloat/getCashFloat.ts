import { CashFloat } from '../db';

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

export default getCashFloat;
