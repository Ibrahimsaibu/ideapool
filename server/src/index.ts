import express from 'express';
import connectDb from './db';
import dotenv from 'dotenv';
import userRoute from './route/authRoute';
import ideaRoute from './route/ideaRoute';
import authRoute from './route/authRoute';
import cors from 'cors/'

dotenv.config()

const app = express()
app.use(cors)
app.use(express.json())

connectDb()

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/ideas', ideaRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })