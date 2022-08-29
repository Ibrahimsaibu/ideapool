"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ideaSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
const ideaModel = (0, mongoose_1.model)('ideas', ideaSchema);
exports.default = ideaModel;
