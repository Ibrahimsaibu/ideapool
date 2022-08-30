"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("src/controller/userController");
const userRoute = (0, express_1.Router)();
userRoute.put('/updateuser', userController_1.updateUser);
exports.default = userRoute;
