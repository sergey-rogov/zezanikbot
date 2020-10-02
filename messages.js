module.exports = {
  help: ({ first_name, last_name }) => `Привет ${last_name} ${first_name}!

Теперь в этот чат я буду присылать все уведомления.

/cashFloat - покажет остаток наличных в кассах

Viel Spaß!`,
  cashFloatReport: (salespoints) => {
    if (salespoints.length === 0) return 'Пока никаких данных об остатке не получено';
    return `${salespoints.map(
      ({ salespointId, amount, reportedAt }) => `${salespointId.padEnd(8, ' ')} ${amount.toString().padEnd(8, ' ')} ${reportedAt.toISOString()}`
    ).join('\n')}`
  },
  somethingWentWrong: 'Что-то пошло не так :(',
  adminUsernameMismatch: 'Извините, у вас нет полномочий использовать этого бота :(',
};
