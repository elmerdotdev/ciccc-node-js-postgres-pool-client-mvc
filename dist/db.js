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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.createClient = void 0;
const pg_1 = require("pg");
const config = {
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
    port: Number(process.env.DBPORT)
};
// Create new client
const createClient = () => {
    return new pg_1.Client(config);
};
exports.createClient = createClient;
// Check if we can connect to database using client connection
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = createClient();
    try {
        yield client.connect();
        console.log('Connected to PostgreSQL database');
        return client;
    }
    catch (err) {
        console.error('Error connecting to database :(');
        throw err;
    }
});
exports.connectDb = connectDb;
