import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name : String,
    surname : String,
    cellNumber : String,
    email : String,
    address : String,
    geoLocation : {
        latitude : Number,
        longitude : Number
    },
    username : String,
    googleId : String,
    password : String,
    forgotPassword : Boolean
});

export const User =  mongoose.model('user', userSchema);
