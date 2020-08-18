"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    image: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date
});
exports.default = mongoose_1.model('post', PostSchema);
