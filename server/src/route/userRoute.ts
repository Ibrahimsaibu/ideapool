import { Router } from 'express'
import { getAllUsers, updateUser } from 'src/controller/userController';
import { createUser, login } from '../controller/authController';

// import authMiddleware from '../middleware/authMiddleware';

const userRoute = Router()

userRoute.post('/signup', createUser)
userRoute.post('/login', login)
userRoute.put('/userUpdate', updateUser)
userRoute.put('/userAll', getAllUsers)

export default userRoute