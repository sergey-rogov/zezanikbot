"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var config_1 = __importDefault(require("../config"));
var dbURL = config_1.default.DATABASE_URL;
if (!dbURL)
    throw new Error('DB connection url is not defined');
var sequelize = new sequelize_1.Sequelize(dbURL);
sequelize.sync().then(function () { return console.log('DB in sync'); });
exports.default = sequelize;
