"use strict";
// import { config } from 'dotenv';
Object.defineProperty(exports, "__esModule", { value: true });
// const parsed = config().parsed;
var parsed = process.env;
[
    'PORT',
    'BOT_TOKENS',
    'API_AUTH_TOKENS',
    'ADMIN_USERNAMES',
    'DATABASE_URL',
].forEach(function (key) {
    if (typeof parsed[key] !== 'string' || parsed[key].length === 0)
        throw new Error("\"" + key + "\" is not defined");
});
var c = {
    PORT: Number(parsed.PORT),
    BOT_TOKENS: parsed.BOT_TOKENS.split(','),
    API_AUTH_TOKENS: parsed.API_AUTH_TOKENS.split(','),
    ADMIN_USERNAMES: parsed.ADMIN_USERNAMES.split(','),
    DATABASE_URL: parsed.DATABASE_URL,
};
if (Number.isNaN(c.PORT))
    throw new Error("\"PORT\" \"" + parsed.PORT + "\" is not a number");
if (c.BOT_TOKENS.some(function (token) { return token.length === 0; }))
    throw new Error("Some of \"BOT_TOKENS\" are empty");
if (c.API_AUTH_TOKENS.some(function (token) { return token.length === 0; }))
    throw new Error("Some of \"API_AUTH_TOKENS\" are empty");
if (c.BOT_TOKENS.length !== c.API_AUTH_TOKENS.length)
    throw new Error("\"BOT_TOKENS\" has " + c.BOT_TOKENS.length + " elements whereas \"API_AUTH_TOKENS\" has " + c.API_AUTH_TOKENS.length + ". They should have equal length");
if (c.ADMIN_USERNAMES.some(function (token) { return token.length === 0; }))
    throw new Error("Some of \"ADMIN_USERNAMES\" are empty");
exports.default = c;
