"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var iconv_lite_1 = __importDefault(require("iconv-lite"));
var containsCyrillic = function (input) { return /[А-я]/i.test(input); };
var fixCharset = function (input) {
    if (!containsCyrillic(input)) {
        console.log('Fixing charset...');
        var buf = iconv_lite_1.default.encode(input, 'win1252');
        var output = iconv_lite_1.default.decode(buf, 'utf8');
        if (containsCyrillic(output)) {
            console.log('Charset fixed');
            return output;
        }
        console.log('Charset not fixed');
    }
    return input;
};
var createMessageRoute = function (sendMessage) { return function (req, res) {
    // const token = getToken(req);
    var token = '';
    console.log(req.headers);
    var text = req.query.text || req.body;
    console.log('text received:', text);
    text = fixCharset(text);
    console.log('Sending message:', text);
    sendMessage(token, text);
    res.send('Message sent');
}; };
exports.default = createMessageRoute;
