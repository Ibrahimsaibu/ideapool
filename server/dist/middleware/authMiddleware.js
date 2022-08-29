"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (req, res, next) => {
    try {
        const reqToken = req.headers.authorization;
        if (!reqToken) {
            return res.status(401).json({
                success: false,
                message: 'token not found',
                data: {},
            });
        }
        const token = reqToken.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        return next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'bad token',
            data: {},
        });
    }
};
exports.default = authMiddleware;
