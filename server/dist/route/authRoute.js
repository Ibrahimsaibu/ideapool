"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controller/authController");
const express_1 = require("express");
const authRoute = (0, express_1.Router)();
authRoute.post('/signup', authController_1.createUser);
authRoute.post('/login', authController_1.login);
exports.default = authRoute;
