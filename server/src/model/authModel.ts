
import { Schema, model } from "mongoose";

const authSchema = new Schema({
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

const authModel = model('auth', authSchema)

export default authModel