import { createUser, login } from '../controller/authController';
import { Router } from 'express'
// import authMiddleware from '../middleware/authMiddleware';

const authRoute = Router()

authRoute.post('/signup', createUser)
authRoute.post('/login', login)





export default authRoute