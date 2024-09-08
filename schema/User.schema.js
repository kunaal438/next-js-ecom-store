import { emailRegex, passwordRegex } from "../utils/regex.js";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    
    fullname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [emailRegex, 'Email is invalid. Please provide a valid email'],
    },
    password: {
        type: String,
        match: [passwordRegex, 'Password should contain 1 uppercase letter, 1 number and should be at least8 characters long']
    }, 
    google_auth: String,
    isAdmin: {
        type: Boolean,
        default: false
    }

})

const User = models.User || model('User', UserSchema);

export default User;