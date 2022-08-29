
import { Schema, model } from "mongoose";


const ideaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    impact: {
        type: Number,
        required: true,
    },
    ease: {
        type: Number,
        required: true,
    },
    confidence: {
        type: Number,
        required: true,
    },

    isDeleted: {
        type: Boolean,
        select: false,
        default: false,
    }


}, { timestamps: true })

const ideaModel = model('ideas', ideaSchema)
export default ideaModel