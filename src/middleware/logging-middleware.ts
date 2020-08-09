import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";


export function loggingMiddleware(req:Request,res:Response,next:NextFunction){
    logger.debug(`${req.method} Request from ${req.ip} to ${req.path} `)
    next()// tells express this function is done, and move to the next matching piece of middleware
}