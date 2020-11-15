"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var cashFloat_1 = require("./cashFloat");
var config_1 = __importDefault(require("./config"));
var bots_1 = __importDefault(require("./bots"));
var configs = config_1.default.BOT_TOKENS.map(function (token) { return ({
    token: token,
    adminUsernames: config_1.default.ADMIN_USERNAMES,
}); });
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var bots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Starting...');
                return [4 /*yield*/, bots_1.default(configs)];
            case 1:
                bots = _a.sent();
                console.log('Bot started.');
                server_1.default({
                    port: config_1.default.PORT,
                    authTokens: config_1.default.API_AUTH_TOKENS,
                    sendMessage: function (authToken, message) {
                        var botIndex = config_1.default.API_AUTH_TOKENS.indexOf(authToken);
                        if (botIndex === -1)
                            throw new Error("No bot found for auth token \"" + authToken + "\"");
                        var botToken = config_1.default.BOT_TOKENS[botIndex];
                        bots.sendMessage(botToken, message);
                    },
                    onCashFloatReport: function (salespointId, amount) { return cashFloat_1.setCashFloat(salespointId, amount); },
                });
                console.log('Server started.');
                return [2 /*return*/];
        }
    });
}); };
start();
