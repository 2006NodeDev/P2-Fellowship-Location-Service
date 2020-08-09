import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";


export function loggingMiddleware(req:Request,res:Response,next:NextFunction){
<<<<<<< HEAD
    console.log(`${req.method} Request from ${req.ip} to ${req.path} `)
    next()
=======
    logger.debug(`${req.method} Request from ${req.ip} to ${req.path} `)
    next()// tells express this function is done, and move to the next matching piece of middleware
>>>>>>> d9c6b21a671bd1c25a2547574fcda616c4682e62
}