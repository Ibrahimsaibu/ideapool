import express from 'express';
import connectDb from './db';
import dotenv from 'dotenv';
import userRoute from './route/userRoute';
import ideaRoute from './route/ideaRoute';
// import authRoute from './route/authRoute';
import cors from 'cors/'

dotenv.config()

const app = express()
// const allowedOrigins = ['https://ideapoolmern.netlify.app', 'localhost:3000'];

// const options: cors.CorsOptions = {
//     origin: function (origin, callback) {
//         if (allowedOrigins.indexOf(origin!) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// };


app.use(cors())
app.use(express.json())

connectDb()

// app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/ideas', ideaRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`server started on port ${PORT}`) })