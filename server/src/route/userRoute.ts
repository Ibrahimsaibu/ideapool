import { createUser, login, updateUser } from './../controller/userController';
import { Router } from 'express'
// import authMiddleware from '../middleware/authMiddleware';

const userRoute = Router()

userRoute.post('/signup', createUser)
userRoute.post('/login', login)
userRoute.put('/updateuser', updateUser)




export default userRoute