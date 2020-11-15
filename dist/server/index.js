"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var withAuth_1 = __importDefault(require("./routes/utils/auth/withAuth"));
var api_1 = __importDefault(require("./routes/api"));
var message_1 = __importDefault(require("./routes/api/message"));
var cashFloat_1 = __importDefault(require("./routes/api/cashFloat"));
var app = express_1.default();
var start = function (_a) {
    var port = _a.port, authTokens = _a.authTokens, sendMessage = _a.sendMessage, onCashFloatReport = _a.onCashFloatReport;
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.text());
    app.get('/', api_1.default());
    // app.post('/api/message', withAuth(authTokens, createMessageRoute(sendMessage)));
    app.post('/api/message', message_1.default(sendMessage));
    app.post('/api/salespoints/:id/cash-float/:amount', withAuth_1.default(authTokens, cashFloat_1.default(onCashFloatReport)));
    app.listen(port, function () {
        console.log("Example app listening at http://localhost:" + port);
    });
};
exports.default = start;
