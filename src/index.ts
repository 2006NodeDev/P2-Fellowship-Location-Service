import express, { Request, Response } from 'express'
import { loggingMiddleware } from './middleware/logging-middleware'
import { corsFilter } from './middleware/cors-filter'
import { JWTVerifyMiddleware } from './middleware/jwt-verify-middleware'
import { locationRouter } from './routers/location-router'
import { logger, errorLogger } from './utils/logger'
import './messaging/index'
import './messaging/user-service-event-listeners'



const basePath = process.env['LB_BASE_PATH'] || ''


// const basePath = process.env['P2_BASE_PATH'] || '' //use / if there is no other base path provided

const app = express()

app.use(express.json({limit:'50mb'}))
//need to increase max size of body we can parse, in order to allow for images

app.use(loggingMiddleware)
//we should probably update these
app.use(corsFilter)

app.use(JWTVerifyMiddleware)
const basePathRouter = express.Router()
app.use(basePath, basePathRouter) 

//const basePathRouter = express.Router()
//app.use(basePath, basePathRouter)


//app.use(authenticationMiddleware) this makes us unable to login... but do we want it?

basePathRouter.use('/locations', locationRouter)// redirect all requests on /locations to the router

app.get('/health', (req:Request,res:Response)=>{
    res.sendStatus(200)
})

// the error handler we wrote that express redirects top level errors to
app.use((err, req, res, next) => {
    
    if (err.statusCode) {
       
        res.status(err.statusCode).send(err.message)
    } else {
        logger.error(err);
        errorLogger.error(err)//log it out for us to debug
        //send a generic error response
        res.status(500).send('Oops, Something went wrong')
    }
})

app.listen(2006, () => {
    logger.info('Server has started');
})