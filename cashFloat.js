const MAX_LIVE_DURATION = 1000 * 60 * 60 * 24 * 31;

const data = new Map();

const clearCashFloat = (salespointId) => {
  data.delete(salespointId);
};

const clearOutdated = () => {
  Array.from(data.keys()).forEach(salespointId => {
    const { reportedAt } = data.get(salespointId);

    if (Date.now() - MAX_LIVE_DURATION > reportedAt.getTime()) {
      clearCashFloat(salespointId);
    }
  });
};

const setCashFloat = (salespointId, amount) => {
  const reportedAt = new Date();
  data.set(salespointId, { amount, reportedAt });

  clearOutdated();
};

const getCashFloat = () => {
  const report = [];
  for (const [salespointId, { amount, reportedAt }] of data.entries()) {
    report.push({
      salespointId,
      amount,
      reportedAt,
    });
  }
  return report;
};

module.exports = {
  setCashFloat,
  getCashFloat,
};
