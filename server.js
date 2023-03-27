import express from 'express';
const app = express()
import dotenv from 'dotenv';
dotenv.config()

import morgan from 'morgan';

import 'express-async-errors';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

//middlewares
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authenticateUser from './middleware/auth.js';

if(process.env.NODE_ENV !== 'production')
{
    app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())  //makes json data available to us in the controllers
app.use(express.static(path.resolve(__dirname,'./client/build')))

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser ,jobsRouter)

app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()