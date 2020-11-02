import moment from 'moment';
import 'moment-timezone';

moment.locale('ru');
moment.tz.setDefault('Europe/Moscow');

const MESSAGES = {
  start: ({
    first_name,
    last_name,
  }: {
    first_name?: string,
    last_name?: string,
  }) => `Привет ${last_name} ${first_name}!

Теперь в этот чат я буду присылать все уведомления.

${MESSAGES.help}

Viel Spaß!`,
  cashFloatReport: (salespoints) => {
    if (salespoints.length === 0) return ['Пока никаких данных об остатке не получено'];

    const sorted = [...salespoints].sort((a, b) => a.salespointId.localeCompare(b.salespointId));

    return sorted.map(
      ({ salespointId, amount, reportedAt }) => `Точка продаж: ${salespointId}
Остаток: ${amount}
Обновлено: ${moment(reportedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`
    )
  },
  somethingWentWrong: 'Что-то пошло не так :(',
  adminUsernameMismatch: 'У вас нет полномочий использовать этого бота :(',
  help: `/start - подписаться на уведомления и показать справку
/subscribe - подписаться на уведомления
/unsubscribe - отписаться от уведомлений

/cashFloat - показать остаток в кассах

/help - справка`,
  subscribed: 'Подписались. Отписаться обратно /unsubscribe',
  unsubscribed: 'Отписались. Подписаться обратно /subscribe',
};

export default MESSAGES;
