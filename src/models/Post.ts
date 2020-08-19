import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces/Post';

const PostSchema = new Schema({
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
        default: Date.now()
    },
    updateAt: Date
});

export default model<IPost>('post', PostSchema);