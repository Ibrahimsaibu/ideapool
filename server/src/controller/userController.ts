import { Request, Response } from 'express'
import { updateUserSchema } from '../validationSchema/authShema'
import userModel from '../model/authModel'


type Req = Request & { userId?: string }

export const updateUser = async (req: Req, res: Response) => {
    try {
        const { value, error } = updateUserSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                mesaage: error.details[0].message,
                data: {}
            })
        }

        await userModel.findByIdAndUpdate(req.userId, { ...value })
        return res.json({
            success: true,
            message: "user info successfully updated",
            data: {}
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            mesaage: "internal server error",
            data: {}
        })

    }
}