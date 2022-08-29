import { Request, Response } from 'express'
import { loginSchema, registerShema, updateUserSchema } from '../validationSchema/authShema'
import userModel from '../model/userModel'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

type Req = Request & { userId?: string }

export const createUser = async (req: Request, res: Response) => {
    const { value, error } = registerShema.validate(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
            data: {}
        })
    }

    const userExist = await userModel.findOne({ email: value.email })
    if (userExist) {
        return res.status(400).json({
            success: false,
            mesaage: "Already created an account",
            data: {}
        })
    }

    const hashedPassword = await argon2.hash(value.password)

    const user = new userModel({ ...value, password: hashedPassword })
    const saveduser = await user.save()
    const token = jwt.sign({ userId: saveduser.id }, process.env.JWT_SECRET as string)
    const findUser = await userModel.findById(saveduser.id)

    return res.status(201).json({
        success: true,
        message: 'user created successfully',
        data: {
            user: findUser,
            token
        }
    })
}


export const login = async (req: Request, res: Response) => {
    try {
        const { value, error } = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                mesaage: error.details[0].message,
                data: {}
            })
        }

        const user = await userModel.findOne({ email: value.email }).select('+password')
        if (!user) {
            return res.status(400).json({
                success: false,
                mesaage: "user not find ",
                data: {}
            })
        }
        const isPasswordCorrect = await argon2.verify(user.password as string, value.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                mesaage: "Email or password mismatch",
                data: {}
            })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)

        return res.json({
            success: true,
            message: 'Welcome',
            data: token,
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            mesaage: "internal server error",
            data: {}
        })

    }
}

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
