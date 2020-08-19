import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    url: string;
    content: string;
    image?: string,
    createAt: Date;
    updateAt: Date
}