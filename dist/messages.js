"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
require("moment-timezone");
moment_1.default.locale('ru');
moment_1.default.tz.setDefault('Europe/Moscow');
var MESSAGES = {
    start: function (_a) {
        var first_name = _a.first_name, last_name = _a.last_name;
        return "\u041F\u0440\u0438\u0432\u0435\u0442 " + last_name + " " + first_name + "!\n\n\u0422\u0435\u043F\u0435\u0440\u044C \u0432 \u044D\u0442\u043E\u0442 \u0447\u0430\u0442 \u044F \u0431\u0443\u0434\u0443 \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0442\u044C \u0432\u0441\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F.\n\n" + MESSAGES.help + "\n\nViel Spa\u00DF!";
    },
    cashFloatReport: function (salespoints) {
        if (salespoints.length === 0)
            return ['Пока никаких данных об остатке не получено'];
        var sorted = __spreadArrays(salespoints).sort(function (a, b) { return a.salespointId.localeCompare(b.salespointId); });
        return sorted.map(function (_a) {
            var salespointId = _a.salespointId, amount = _a.amount, reportedAt = _a.reportedAt;
            return "\u0422\u043E\u0447\u043A\u0430 \u043F\u0440\u043E\u0434\u0430\u0436: " + salespointId + "\n\u041E\u0441\u0442\u0430\u0442\u043E\u043A: " + amount + "\n\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: " + moment_1.default(reportedAt).format('dddd, MMMM Do YYYY, HH:mm:ss');
        });
    },
    somethingWentWrong: 'Что-то пошло не так :(',
    adminUsernameMismatch: 'У вас нет полномочий использовать этого бота :(',
    help: "/start - \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u043F\u0440\u0430\u0432\u043A\u0443\n/subscribe - \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\n/unsubscribe - \u043E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439\n\n/cashFloat - \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0441\u0442\u0430\u0442\u043E\u043A \u0432 \u043A\u0430\u0441\u0441\u0430\u0445\n\n/help - \u0441\u043F\u0440\u0430\u0432\u043A\u0430",
    subscribed: 'Подписались. Отписаться обратно /unsubscribe',
    unsubscribed: 'Отписались. Подписаться обратно /subscribe',
};
exports.default = MESSAGES;
