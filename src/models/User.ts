import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]

});

export default model<IUser>('user', UserSchema);