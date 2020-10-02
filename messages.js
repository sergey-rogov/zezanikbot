module.exports = {
  help: ({ first_name, last_name }) => `Привет ${last_name} ${first_name}!

Теперь в этот чат я буду присылать все уведомления.

/cashFloat - покажет остаток наличных в кассах

Viel Spaß!`,
  cashFloatReport: (salespoints) => {
    if (salespoints.length === 0) return 'Пока никаких данных об остатке не получено';
    return `${salespoints.map(
      ({ salespointId, amount, reportedAt }) => `Точка продаж: ${salespointId}
Остаток: ${amount}
Обновлено: ${reportedAt.toISOString()}`
    ).join('\n\n')}`
  },
  somethingWentWrong: 'Что-то пошло не так :(',
  adminUsernameMismatch: 'У вас нет полномочий использовать этого бота :(',
};
