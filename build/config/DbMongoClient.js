"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DbMongoClient {
    connect() {
        mongoose_1.default.connect(`${process.env.MONGODB_URI}`, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(() => {
            console.log('Mongodb connected');
        })
            .catch(err => console.error(err.message));
    }
}
exports.default = new DbMongoClient();
