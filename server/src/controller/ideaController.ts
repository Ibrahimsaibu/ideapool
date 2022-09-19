import { ideaSchema, updateIdeaSchema } from './../validationSchema/ideaSchema';
import { Request, Response } from 'express'
import ideaModel from '../model/ideaModel';

type Req = Request & { userId?: string }

export const createIdea = async (req: Req, res: Response) => {
    const { value, error } = ideaSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: {}
        })
    }

    const idea = new ideaModel({ ...value, user: req.userId })
    const saveIdea = await idea.save()

    return res.status(201).json({
        success: true,
        message: 'Idea created successfully',
        data: saveIdea,

    })
}

export const getIdeas = async (req: Req, res: Response) => {
    const ideas = await ideaModel.find({ user: req.userId, isDeleted: false }).populate('user', 'id name email')
    if (ideas.length < 1) {
        return res.json({
            success: true,
            message: 'No idea found for this user please create one',
            data: []
        })
    }
    return res.json({
        success: true,
        message: 'Ideas successfully fetched',
        data: ideas

    })
}

export const removeIdea = async (req: Req, res: Response) => {
    try {
        const fetchUserIdea = await ideaModel.findById(req.params.id)
        if (!fetchUserIdea) {
            return res.status(404).json({
                success: false,
                message: 'idea not found',
                data: []
            })
        }

        if (req.userId?.toString() !== String(fetchUserIdea.user)) {
            return res.status(401).json({
                success: false,
                message: "not authorized to take this action",
                data: [],
            })
        }

        await ideaModel.findByIdAndUpdate(req.params.id, { isDeleted: true })
        return res.json({
            success: true,
            message: "Idea deleted successfull",
            data: []
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            data: [],
        })
    }
}
export const updateIdea = async (req: Req, res: Response) => {
    const { value, error } = updateIdeaSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: {}
        })
    }
    try {
        const fetchUserIdea = await ideaModel.findById(req.params.id)
        if (!fetchUserIdea) {
            return res.status(404).json({
                success: false,
                message: 'idea not found',
                data: []
            })
        }

        if (req.userId?.toString() !== String(fetchUserIdea.user)) {
            return res.status(401).json({
                success: false,
                message: "not authorized to take this action",
                data: [],
            })
        }

        await ideaModel.findByIdAndUpdate(req.params.id, { ...value })
        return res.json({
            success: true,
            message: "Idea  successfully updated",
            data: []
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'something went wrong',
            data: [],
        })
    }
}
