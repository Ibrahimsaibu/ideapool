import { Router } from 'express'
import { updateUser } from 'src/controller/userController'
// import authMiddleware from '../middleware/authMiddleware';

const userRoute = Router()

userRoute.put('/updateuser', updateUser)

export default userRoute