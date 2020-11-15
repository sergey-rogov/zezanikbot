"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
;
exports.getToken = function (req) { return req.headers.authorization || req.query.auth; };
var authorized = function (validTokens, req, res) {
    var actualToken = exports.getToken(req);
    var isAuthorized = validTokens.includes(actualToken);
    if (!isAuthorized) {
        res.statusCode = 401;
        res.send('Unauthorized');
    }
    return isAuthorized;
};
exports.default = authorized;
