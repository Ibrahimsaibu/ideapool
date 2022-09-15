import { Router } from 'express'
import { updateUser } from 'src/controller/userController';
import { createUser, login } from '../controller/authController';

// import authMiddleware from '../middleware/authMiddleware';

const userRoute = Router()

userRoute.post('/signup', createUser)
userRoute.post('/login', login)
userRoute.put('/userUpdate', updateUser)

export default userRoute