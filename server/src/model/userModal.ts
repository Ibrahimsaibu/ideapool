
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,


    },

    created: { type: Date, default: Date.now },
    updated: Date
})

const userModel = model('user', userSchema)

export default userModel