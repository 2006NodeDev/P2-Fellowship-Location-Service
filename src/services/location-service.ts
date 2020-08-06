import { userUpdateLocation, getAllLocations, findLocationById, adminUpdateLocation, addNewImage } from '../daos/SQL/location-dao'
import { Location } from '../models/Location'
import { bucketBaseUrl } from '../daos/Cloud-Storage'
import { saveLocationImage } from '../daos/Cloud-Storage/location-images'

export async function getAllLocationsService(): Promise<Location[]> {
    return await getAllLocations()
}

export async function findLocationByIdService(locationId:number): Promise<Location> {
    return await findLocationById(locationId)
}

//this is way too complicated
export async function userUpdateLocationService(locationId: number, userId: number, locationVisited: Boolean, locationRating: number, locationImage:string): Promise<Location> {
    try {
        if (locationImage) { //avoid splitting a void string!
            let base64Image = locationImage
            let [dataType, imageBase64Data] = base64Image.split(';base64,')// gets us the two important parts of the base 64 string
            //we need to make sure picture is in the right format
            let contentType = dataType.split('/').pop()
            //then the pop method gets us the last thing in the array

            let newImage64Object = await addNewImage(imageBase64Data)
            console.log(newImage64Object.imageId);
            //need this to get the image Id number
            let location = await findLocationById(locationId)
            //need this to get the location name for the path
            //get rid of the spaces in the location name
            let locationImageName = location.name.split(" ").join("")
            console.log(locationImageName)

            //we need to add the picture path to the location data for the sql database        
            locationImage = `${bucketBaseUrl}/LOTR_Locations/${locationImageName}-${newImage64Object.imageId}.${contentType}`
            console.log(locationImage);
            
            //we need to save a picture to cloud storage 
            //we are adding the imageId so that we can save multiple of the same location
            await saveLocationImage(contentType, imageBase64Data, `LOTR_Locations/${locationImageName}-${newImage64Object.imageId}.${contentType}`)
            
            //update the location in the database
            await userUpdateLocation(locationId, userId, locationVisited, locationRating, locationImage, newImage64Object.imageId)
            //(making sure to update row in location_images table to have the path, not the 64-bit data)
            let updatedLocation = await findLocationById(locationId)
            console.log(updatedLocation.image); //check that it's been updating/returning the right thing
            //for some reason it is ordering the images in alphabetical order.  It won't be a problem when using real data (since images uploaded later will come after) but it's weird
            return updatedLocation
            //this way we are updating the location and getting the updated location to send back to the front end
        } else {
            await userUpdateLocation(locationId, userId, locationVisited, locationRating, null, null)
            //we need to save the updated location data to the sql database (making sure to update row in location_images table to have the path, not the 64-bit data)
            let updatedLocation = await findLocationById(locationId)            
            return updatedLocation
            //this way we are updating the location and getting the updated location to send back to the front end
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function adminUpdateLocationService(updatedLocation:Location): Promise<Location> {
    let savedLocation = await adminUpdateLocation(updatedLocation)
    console.log(updatedLocation);
    //just checking it updated corectly
    return savedLocation
}
