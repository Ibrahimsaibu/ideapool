import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

type Req = Request & { userId?: string }

const authMiddleware = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const reqToken = req.headers.authorization
        if (!reqToken) {
            return res.status(401).json({
                success: false,
                message: 'token not found',
                data: {},
            })
        }
        const token = reqToken.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { userId?: string }
        req.userId = decoded.userId
        return next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'bad token',
            data: {},
        })
    }
}

export default authMiddleware