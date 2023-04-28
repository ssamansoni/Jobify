import jwt from 'jsonwebtoken';
import unauthenticatedError from "../errors/unauthenticatedError.js";

const auth = async (req,res,next) => {

    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer'))
    {
        throw new unauthenticatedError("Authentication Failed!");
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = {userId: payload.userId}

        next()
    }
    catch(error)
    {
        throw new unauthenticatedError("Authentication Failed!");
    }
}

export default auth;
