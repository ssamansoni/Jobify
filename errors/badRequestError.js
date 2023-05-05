import customError from "./customError.js";
import {StatusCodes } from "http-status-codes";

class badRequestError extends customError {
    constructor(message)
    {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default badRequestError;