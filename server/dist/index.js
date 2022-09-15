"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./route/authRoute"));
const ideaRoute_1 = __importDefault(require("./route/ideaRoute"));
const cors_1 = __importDefault(require("cors/"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/user', authRoute_1.default);
app.use('/ideas', ideaRoute_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`server started on port ${PORT}`); });
