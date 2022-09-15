"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controller/userController");
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userRoute = (0, express_1.Router)();
userRoute.post('/signup', userController_1.createUser);
userRoute.post('/login', userController_1.login);
userRoute.put('/userUpdate', userController_1.updateUser);
userRoute.put('/userAll', userController_1.getAllUsers);
userRoute.get('/me', authMiddleware_1.default, userController_1.getUserbyId);
exports.default = userRoute;
