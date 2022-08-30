"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const authShema_1 = require("../validationSchema/authShema");
const authModel_1 = __importDefault(require("../model/authModel"));
const updateUser = async (req, res) => {
    try {
        const { value, error } = authShema_1.updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                mesaage: error.details[0].message,
                data: {}
            });
        }
        await authModel_1.default.findByIdAndUpdate(req.userId, Object.assign({}, value));
        return res.json({
            success: true,
            message: "user info successfully updated",
            data: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            mesaage: "internal server error",
            data: {}
        });
    }
};
exports.updateUser = updateUser;
