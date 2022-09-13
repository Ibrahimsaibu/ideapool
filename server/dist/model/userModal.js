"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
const userModel = (0, mongoose_1.model)('user', userSchema);
exports.default = userModel;
