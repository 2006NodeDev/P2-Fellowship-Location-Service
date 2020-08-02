import { userUpdateLocation, getAllLocations, findLocationById } from '../daos/SQL/location-dao'
import { Location } from '../models/Location'

export async function getAllLocationsService(): Promise<Location[]> {
    return await getAllLocations()
}

export async function findLocationByIdService(locationId:number): Promise<Location> {
    return await findLocationById(locationId)
}

export async function userUpdateLocationService(locationId: number, userId: number, locationVisited: Boolean, locationRating: number, locationImage:string): Promise<Location> {
    await userUpdateLocation(locationId, userId, locationVisited, locationRating, locationImage)
    let location = await findLocationById(locationId)
    console.log(location); //check that it's been updating/returning the right thing
    return location
    //this way we are updating the location and getting the updated location to send back to the front end
}
