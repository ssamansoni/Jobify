import customError from "./customError.js";
import {StatusCodes } from "http-status-codes";

class unauthenticatedError extends customError {
    constructor(message)
    {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default unauthenticatedError;