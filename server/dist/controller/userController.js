"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.login = exports.createUser = void 0;
const authShema_1 = require("../validationSchema/authShema");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModal_1 = __importDefault(require("../model/userModal"));
const createUser = async (req, res) => {
    const { value, error } = authShema_1.registerShema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: {}
        });
    }
    const userExist = await userModal_1.default.findOne({ email: value.email });
    if (userExist) {
        return res.status(400).json({
            success: false,
            mesaage: "Already created an account",
            data: {}
        });
    }
    const hashedPassword = await argon2_1.default.hash(value.password);
    const user = new userModal_1.default(Object.assign(Object.assign({}, value), { password: hashedPassword }));
    const saveduser = await user.save();
    const token = jsonwebtoken_1.default.sign({ userId: saveduser.id }, process.env.JWT_SECRET);
    const findUser = await userModal_1.default.findById(saveduser.id);
    return res.status(201).json({
        success: true,
        message: 'user created successfully',
        data: {
            user: findUser,
            token
        }
    });
};
exports.createUser = createUser;
const login = async (req, res) => {
    try {
        const { value, error } = authShema_1.loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                mesaage: error.details[0].message,
                data: {}
            });
        }
        const user = await userModal_1.default.findOne({ email: value.email }).select('+password');
        if (!user) {
            return res.status(400).json({
                success: false,
                mesaage: "user not find ",
                data: {}
            });
        }
        const isPasswordCorrect = await argon2_1.default.verify(user.password, value.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                mesaage: "Email or password mismatch",
                data: {}
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
        return res.json({
            success: true,
            message: 'Welcome',
            data: token,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            mesaage: "internal server error",
            data: {}
        });
    }
};
exports.login = login;
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
        await userModal_1.default.findByIdAndUpdate(req.userId, Object.assign({}, value));
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
