
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false
    },

    created: { type: Date, default: Date.now },
    updated: Date
})

const userModel = model('user', userSchema)

export default userModel