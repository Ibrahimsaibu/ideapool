"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdea = exports.removeIdea = exports.getIdeas = exports.createIdea = void 0;
const ideaSchema_1 = require("./../validationSchema/ideaSchema");
const ideaModel_1 = __importDefault(require("../model/ideaModel"));
const createIdea = async (req, res) => {
    const { value, error } = ideaSchema_1.ideaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: {}
        });
    }
    const idea = new ideaModel_1.default(Object.assign(Object.assign({}, value), { user: req.userId }));
    const saveIdea = await idea.save();
    return res.status(201).json({
        success: true,
        message: 'Idea created successfully',
        data: saveIdea,
    });
};
exports.createIdea = createIdea;
const getIdeas = async (req, res) => {
    const ideas = await ideaModel_1.default.find({ user: req.userId, isDeleted: false }).populate('user', 'id name email');
    if (ideas.length < 1) {
        return res.json({
            success: true,
            message: 'No idea found for this user please create one',
            data: []
        });
    }
    return res.json({
        success: true,
        message: 'Ideas successfully fetched',
        data: ideas
    });
};
exports.getIdeas = getIdeas;
const removeIdea = async (req, res) => {
    var _a;
    try {
        const fetchUserIdea = await ideaModel_1.default.findById(req.params.id);
        if (!fetchUserIdea) {
            return res.status(404).json({
                success: false,
                message: 'idea not found',
                data: []
            });
        }
        if (((_a = req.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== String(fetchUserIdea.user)) {
            return res.status(401).json({
                success: false,
                message: "not authorized to take this action",
                data: [],
            });
        }
        await ideaModel_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true });
        return res.json({
            success: true,
            message: "Idea deleted successfull",
            data: []
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            data: [],
        });
    }
};
exports.removeIdea = removeIdea;
const updateIdea = async (req, res) => {
    var _a;
    const { value, error } = ideaSchema_1.updateIdeaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: {}
        });
    }
    try {
        const fetchUserIdea = await ideaModel_1.default.findById(req.params.id);
        if (!fetchUserIdea) {
            return res.status(404).json({
                success: false,
                message: 'idea not found',
                data: []
            });
        }
        if (((_a = req.userId) === null || _a === void 0 ? void 0 : _a.toString()) !== String(fetchUserIdea.user)) {
            return res.status(401).json({
                success: false,
                message: "not authorized to take this action",
                data: [],
            });
        }
        await ideaModel_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, value));
        return res.json({
            success: true,
            message: "Idea  successfully updated",
            data: []
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            data: [],
        });
    }
};
exports.updateIdea = updateIdea;
