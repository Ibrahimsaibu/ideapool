"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdeaSchema = exports.ideaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ideaSchema = joi_1.default.object({
    text: joi_1.default.string().required(),
    ease: joi_1.default.number().required(),
    impact: joi_1.default.number().required(),
    confidence: joi_1.default.number().required(),
    average: joi_1.default.number().required(),
});
exports.updateIdeaSchema = joi_1.default.object({
    text: joi_1.default.string(),
    ease: joi_1.default.number(),
    impact: joi_1.default.number(),
    confidence: joi_1.default.number(),
    average: joi_1.default.number(),
});
