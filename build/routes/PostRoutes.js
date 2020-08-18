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
const Post_1 = __importDefault(require("../models/Post"));
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getAllPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.default.find();
            res.json(posts);
        });
    }
    getPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.params.url;
            const post = yield Post_1.default.findOne({ url: url });
            res.json(post);
        });
    }
    createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = new Post_1.default(req.body);
            yield post.save();
            res.json(post);
        });
    }
    updatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield Post_1.default.findOneAndUpdate({ url }, req.body, { new: true });
            res.json(post);
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield Post_1.default.findOneAndDelete({ url });
            res.json(post);
        });
    }
    routes() {
        this.router.get('/', this.getAllPost);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
