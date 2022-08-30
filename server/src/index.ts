import express from 'express';
import connectDb from './db';
import dotenv from 'dotenv';
import userRoute from './route/userRoute';
import ideaRoute from './route/ideaRoute';

dotenv.config()

const app = express()
app.use(express.json())
connectDb()

app.use('/user', userRoute)
app.use('/ideas', ideaRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })