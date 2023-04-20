import express from 'express';
const router = express.Router()

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
    windowMs: 10*60*1000,
    max: 10,
    message: 'Too many requests from this IP address, please try again after 10 minutes',
})

import authenticateUser from '../middleware/auth.js';
import {register , login, updateUser} from '../controllers/authControllers.js'

//public routes
router.route('/register').post(apiLimiter,register);
router.route('/login').post(apiLimiter,login);

//private routes
router.route('/updateUser').patch(authenticateUser,updateUser);

export default router;