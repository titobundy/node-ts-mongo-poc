import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './Post';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createAt: Date;
    posts: [IPost['_id']]
}