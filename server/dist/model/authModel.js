"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
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
});
const authModel = (0, mongoose_1.model)('user', authSchema);
exports.default = authModel;
