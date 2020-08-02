import express, { Request, Response, NextFunction } from 'express'
import { getAllLocationsService, findLocationByIdService, userUpdateLocationService } from "../services/location-service"

import { LocationIdInputError } from '../errors/Location-Id-Input-Error'
import { LocationIdNumberNeededError } from '../errors/Location-Id-Number-Needed-Error'
import { LocationNotVisitedError } from '../errors/Location-Not-Visted-Error'
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
locationRouter.patch('/update/:locationId', async (req:any, res:Response, next:NextFunction) => {
    let locationId = req.params
    let currentUserId = req.user.userId
    //make sure they are number below

    let {visited, rating, image} = req.body

    if(!locationId || isNaN(+locationId)) { 
        next (new LocationIdNumberNeededError)    
    } else if (visited === false){
        next (new LocationNotVisitedError)
    } else {
        try {
           //this is going to be the array returned (with placesVisited, numVisited, (avg)rating, and Images[])
            let updatesMade = await userUpdateLocationService(+locationId, +currentUserId, visited, rating, image)
            console.log(updatesMade);
            
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


// //possible patch? for admin
// locationRouter.patch('/update/:locationId', async (req:Request, res:Response, next:NextFunction) => {
//     let {locationId} = req.params
//     //get user id
//     let { name,
//         image,//array?
//         realm, 
//         governance,
//         primaryPopulation, 
//         description,
//         rating, 
//         numVisited} = req.body
//     console.log(req.body)
//     if(!locationId || isNaN(+locationId)) { 
//        next (new LocationIdNumberNeededError)    
//     } else {
//        //updated the num_visited and places_visited for locations and users resp.
//        //add a photo to the array 
//        //add a rating, then upate the locations rating average    
//         let updatedLocation:Location = 
//         { 
//             locationId, 
//             name,
//             image,//array?
//             realm, 
//             governance,
//             primaryPopulation, 
//             description,
//             rating, 
//             numVisited
//         }
//         updatedLocation.name = name || undefined
//         updatedLocation.image = image || undefined
//         updatedLocation.realm =  realm || undefined
//         updatedLocation.governance =  governance || undefined
//         updatedLocation.primaryPopulation = primaryPopulation || undefined
//         updatedLocation.rating =  rating || undefined
//         updatedLocation.numVisited = numVisited || undefined
//         try 
//         {
//             let updatedLocationResults = await updatelocationInfo(updatedLocation)
//             res.json(updatedLocationResults)
//         } 
//         catch (e) 
//         {
//             next(e)
//         }
//     }
// })


/*for a new location!
locationRouter.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    let 
    { 
        name,
        image,//array?
        realm, 
        governance,
        primaryPopulation, 
        governance,
        rating, 
        numVisited,
         } = req.body //this is destructuring
    // warning if data is allowed to be null or 0, or false, this check is not sufficient
    if (locationId && genre && authors && publishingDate && publisher && pages && chapters && title && ISBN && (!series && numVisitedof (series) === 'boolean' || series) && numberInSeries) {
        //locations.push({ locationId, genre, authors, publisher, publishingDate, pages, chapters, title, series, numberInSeries, ISBN })
        //send description just sents an empty response with the  description code provided
        res.send(201)//201 is created
    } else {
        // . description sets the  description code but deson't send res
        // .send can send a response in many different content-numVisiteds
        throw new LocationUserInputError()
    }
})

*/