import express, { Request, Response, NextFunction } from 'express'
import { getAllLocationsService, findLocationByIdService, userUpdateLocationService, adminUpdateLocationService } from "../services/location-service"
import { Location } from '../models/Location'

import { LocationIdInputError } from '../errors/Location-Id-Input-Error'
import { LocationIdNumberNeededError } from '../errors/Location-Id-Number-Needed-Error'
import { LocationNotVisitedError } from '../errors/Location-Not-Visted-Error'
import { logger } from '../utils/logger'
//import { authenticationMiddleware } from '../middleware/authentication-middleware'
 
export let locationRouter = express.Router()

//we're setting this here and not in the index
//locationRouter.use(authenticationMiddleware)

//GET all locations
locationRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let locations = await getAllLocationsService()
        res.json(locations)
    } catch (e) {
        next(e)
    }

})

//GET location by id
locationRouter.get('/:locationId', async (req: Request, res: Response, next:NextFunction) => {
    let { locationId } = req.params
   
    if (isNaN(+locationId)) {// we can use the + to convert a variable to a number - node says do it this way
        next(new LocationIdInputError())
    } else {
        try {
            let location = await findLocationByIdService(+locationId)
            res.json(location)
        } catch(e){
            next(e)
        }
    }
})

//PATCH user update 
locationRouter.patch('/user/update/:locationId', async (req:any, res:Response, next:NextFunction) => {
    let { locationId }= req.params
    let currentUserId = req.user.userId
    //make sure they are numbers below
    logger.debug(+locationId);
    logger.debug(+currentUserId);
    
    let {visited, rating, image} = req.body
    console.log(req.body)

    if(!locationId || isNaN(+locationId)) { 
        next (new LocationIdNumberNeededError)    
    } else if (visited === false){
        next (new LocationNotVisitedError)
    } else {
        try {
           //this is going to be the array returned (with placesVisited, visited, (avg)rating, and Images[])
            let updatesMade = await userUpdateLocationService(+locationId, +currentUserId, visited, rating, image)
            logger.debug(updatesMade);
            //check
            res.status(200).send("Your contribution has been taken into consideration")
            //what should we send as a response? 
            //do we need to send requests to updateUser and updateLocations with the new info??
            //the data is already being updated... 
            //so just return a message saying you updated it? 
            //then when you go to the location page or your user page, it should be updated
        } catch (e) {
            next(e)
        }
    }
})


//PATH for admin
locationRouter.patch('/update/:locationId', async (req:Request, res:Response, next:NextFunction) => {
    let {locationId} = req.params
    let currentLocationId = +locationId
    //get user id
    let { name,
        realm, 
        governance,
        primaryPopulation, 
        description} = req.body
    //here, admins only update the fields above. Otherwise, they can go to the other update component to act as a user
    logger.debug(req.body)
    if(!currentLocationId || isNaN(currentLocationId)) { 
       next (new LocationIdNumberNeededError)    
    } else {
        
        let updatedLocation:Location = { 
            locationId: currentLocationId, 
            name,
            image: (await findLocationByIdService(currentLocationId)).image,//array?
            realm, 
            governance,
            primaryPopulation, 
            description,
            rating: (await findLocationByIdService(currentLocationId)).rating, 
            numVisited:  (await findLocationByIdService(currentLocationId)).numVisited 
        }
        updatedLocation.name = name || undefined
        updatedLocation.realm =  realm || undefined
        updatedLocation.governance =  governance || undefined
        updatedLocation.primaryPopulation = primaryPopulation || undefined
        try {
            let updatedLocationResults = await adminUpdateLocationService(updatedLocation)
            logger.debug(updatedLocationResults);
            //check
            res.json(updatedLocationResults)
        } catch (e) {
            next(e)
        }
    }
})
