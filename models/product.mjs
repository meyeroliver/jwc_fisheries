import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
    code : String,
    item : String,
    price : Number,
    category : String,
    takeAway: Boolean
});