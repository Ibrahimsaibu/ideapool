
import { createUser, login, getAllUsers, updateUser, getUserbyId, } from './../controller/userController';
import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware';


// import authMiddleware from '../middleware/authMiddleware';

const userRoute = Router()

userRoute.post('/signup', createUser)
userRoute.post('/login', login)
userRoute.put('/userUpdate', updateUser)
userRoute.put('/userAll', getAllUsers)
userRoute.get('/me', authMiddleware, getUserbyId)

export default userRoute