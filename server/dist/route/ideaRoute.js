"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ideaController_1 = require("./../controller/ideaController");
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const ideaRoute = (0, express_1.Router)();
ideaRoute.post('/createidea', authMiddleware_1.default, ideaController_1.createIdea);
ideaRoute.get('/getideas', authMiddleware_1.default, ideaController_1.getIdeas);
ideaRoute.delete('/:id', authMiddleware_1.default, ideaController_1.removeIdea);
ideaRoute.put('/:id', authMiddleware_1.default, ideaController_1.updateIdea);
exports.default = ideaRoute;
