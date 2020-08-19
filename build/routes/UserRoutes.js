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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const http_errors_1 = __importDefault(require("http-errors"));
const User_1 = __importDefault(require("../models/User"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getAllUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const user = yield User_1.default.findOne({ username }).populate('posts', 'title url -_id');
                if (!user) {
                    throw http_errors_1.default(404, 'User does not exist.');
                }
                res.json(user);
            }
            catch (error) {
                if (error instanceof mongoose_1.Error.CastError) {
                    next(http_errors_1.default(400, 'Invalid user id'));
                    return;
                }
                next(error);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.default(req.body);
                yield user.save();
                res.json(user);
            }
            catch (error) {
                if (error.name === 'ValidationError') {
                    return next(http_errors_1.default(422, error.message));
                }
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const user = yield User_1.default.findOneAndUpdate({ username }, req.body, { new: true });
                if (!user) {
                    throw http_errors_1.default(404, 'User does not exist.');
                }
                res.json(user);
            }
            catch (error) {
                if (error instanceof mongoose_1.Error.CastError) {
                    return next(http_errors_1.default(400, 'Invalid user id'));
                }
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const user = yield User_1.default.findOneAndDelete({ username });
                if (!user) {
                    throw http_errors_1.default(404, 'User does not exist.');
                }
                res.json(user);
            }
            catch (error) {
                if (error instanceof mongoose_1.Error.CastError) {
                    next(http_errors_1.default(400, 'Invalid user id'));
                    return;
                }
                next(error);
            }
        });
    }
    routes() {
        this.router.get('/', this.getAllUser);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
