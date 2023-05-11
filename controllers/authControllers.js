import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {badRequestError , unauthenticatedError} from "../errors/index.js";

const register = async (req, res) => {
    const {name , email , password } = req.body;
    if(!name || !email || !password)
    {
        throw new badRequestError("Please provide all values") //Error is a java script class object
    }

    const userAlreadyExists = await User.findOne({email});

    if(userAlreadyExists)
    {
        throw new badRequestError("This email is already registered with us.");
    }

    const user = await User.create({name , email , password})

    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user : {email : user.email , name : user.name , lastName : user.lastName , location : user.location}, token })
}

const login = async (req, res) => {
    const {email,password} = req.body;

    if(!email || !password)
    {
        throw new badRequestError("Please provide all values");
    }

    const user = await User.findOne({email}).select('+password');
    if(!user) {
        throw new unauthenticatedError("Invalid Credentials!");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect)
    {
        throw new unauthenticatedError("Invalid Credentials!");
    }

    const token = user.createJWT();
    user.password = undefined; //to remove password from response
    res.status(StatusCodes.OK).json({user,token});
}

const updateUser = async (req, res) => {

    const {name,email,lastName,location} = req.body;

    if(!name || !email || !lastName || !location)
    {
        throw new badRequestError("Please provide all values!");
    }

    const user = await User.findOne({_id:req.user.userId});

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    const token = user.createJWT();
    
    res.status(StatusCodes.OK).json({ user , token});
}

export {register , login, updateUser};