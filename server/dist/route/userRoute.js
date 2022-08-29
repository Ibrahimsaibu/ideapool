"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controller/userController");
const express_1 = require("express");
const userRoute = (0, express_1.Router)();
userRoute.post('/signup', userController_1.createUser);
userRoute.post('/login', userController_1.login);
userRoute.put('/updateuser', userController_1.updateUser);
exports.default = userRoute;
