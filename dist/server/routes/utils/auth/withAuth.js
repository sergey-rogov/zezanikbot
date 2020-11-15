"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authorized_1 = __importDefault(require("./authorized"));
var withAuth = function (validAuthTokens, route) { return function (req, res) {
    if (!authorized_1.default(validAuthTokens, req, res))
        return;
    route(req, res);
}; };
exports.default = withAuth;
