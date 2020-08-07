import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { LocationNotFoundError } from "../../errors/Location-Not-Found-Error";
import { LocationDTOtoLocationConvertor } from "../../utils/LocationDTO-to-Location-converter";
import { Location } from "../../models/Location";
import { Image } from "../../models/Image";
import { LocationNotVisitedError } from "../../errors/Location-Not-Visted-Error";
import { ImageDTOtoImageConverter } from "../../utils/ImageDTO-to-Image-Converter";

const schema = process.env['P2_SCHEMA'] || 'project_2_location_service'

export async function getAllLocations(): Promise<Location[]> {
    //first, decleare a client
    let client: PoolClient;
    try {
        //get connection
        client = await connectionPool.connect()
        //send query
        let results: QueryResult = await client.query(`select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
                                            array_agg(distinct (li."image")) as images,
                                            array_agg(distinct (li."image_id")) as image_ids
                                            from ${schema}.locations l
                                            left join ${schema}.locations_location_images lli on l."location_id"=lli."location_id"
                                            left join ${schema}.location_images li on li."image_id"=lli."image_id"
                                            group by l."location_id";`)
        //return results
        //console.log(results);        
        console.log(results.rows.map(LocationDTOtoLocationConvertor))
        return results.rows.map(LocationDTOtoLocationConvertor)
    } catch (e) {
        //if we get an error we don't know
        console.log(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        // we make sure client isn't undefined
        client && client.release()//then we release it
    }
}
//find location by ID
export async function findLocationById(locationId:number): Promise<Location> {
    let client: PoolClient;
    try{
        //id = '1 or 1 = 1; drop table l${schema}.books cascade; select * from l${schema}.book '
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
                                            array_agg(distinct (li."image")) as images,
                                            array_agg(distinct (li."image_id")) as image_ids
                                            from ${schema}.locations l
                                            left join ${schema}.locations_location_images lli on l."location_id"=lli."location_id"
                                            left join ${schema}.location_images li on li."image_id"=lli."image_id"
                                            where l."location_id"=$1
                                            group by l."location_id";`, [locationId])
        console.log(results.rows[0]);        
        if(results.rowCount === 0){
            throw new Error('NotFound')
        }else{
            return LocationDTOtoLocationConvertor(results.rows[0])
        }
    }catch(e){
        if(e.message === 'NotFound'){
            throw new LocationNotFoundError()
        }
        console.log(e)
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    }finally{
        client && client.release()
    }
}

//add a new image
export async function addNewImage(image64: String): Promise<Image> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()        
        let results: QueryResult = await client.query(`insert into ${schema}.location_images("image") 
                                                        values ($1) returning "image_id";`, [image64])

        //insert the new image as a 64-bit string in order to get its ID number
        console.log(ImageDTOtoImageConverter(results.rows[0]))
        //check that stuff is working the way it's supposed to
        return ImageDTOtoImageConverter(results.rows[0])
        //we will be using this to name file in bucket        
    } catch(e) {
        client && client.query('ROLLBACK;') //if a js error takes place, send it back
        console.log(e);
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        client && client.release()
    }
}

//is the locations router the best place for this?
//need to get the id number of the current user!
//return array with placesVisite, numVisited, (avg)rating, and Image array .... should it be any[]?
export async function userUpdateLocation(locationId: number, userId: number, locationVisited: Boolean, locationRating: number, locationImage:string, imageId :number){
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;') 
        
        if (!locationId){
            throw new Error('Not Found')
        }
        if (locationVisited === false) { //this might be extra, since checked in router (and to be checked in frontend too), but may as well keep it in
            throw new Error('Not Visited')
        }
        if (locationVisited) {
            let userLocation = await client.query(`select * from  ${schema}.users_locations ul
                                                    where ul."user_id" = $1 and ul."location_id" =$2;`, 
                                                    [userId, locationId])
            //check the results
            console.log(userLocation.rows[0]);
            //we need this so that if a user alread has visited and rated it, we can still change it
            if (!userLocation) {
                //add a row to the users_locations table
                await client.query(`insert into  ${schema}.users_locations ("user_id", "location_id")
                                                    values ($1,$2);`, [userId, locationId])
                
                //update the number in the places_visited column for the user            
                //and get the updated places_visited
                let placesVisited = await client.query(`update  ${schema}.users u 
                                        set "places_visited" = 
                                            (select COUNT(ul."location_id") 
                                            from  ${schema}.users_locations ul
                                            where ul."user_id" = $1)
                                        where u."user_id"=$1
                                        returning u."places_visited";`, [userId]) 

                //update the number in num_visited column for the location
                //get the updated num_visited
                let numVisited = await client.query(`update  ${schema}.locations l
                                        set "num_visited" = 
                                            (select COUNT(ul."user_id") 
                                            from  ${schema}.users_locations ul
                                            where ul."location_id" = $1)
                                        where l."location_id"=$1
                                        returning l."num_visited";`, [locationId]) 
                //check that we are getting values 
                console.log(numVisited.rows[0]);
                console.log(placesVisited.rows[0]);
            }
            
        }
        if (0 <= locationRating && locationRating <= 5) {
            //add the rating in the users_locations table
            await client.query(`update  ${schema}.users_locations ul
                                    set "rating" = $1 
                                    where ul."user_id" = $2 and ul."location_id" = $3;`, [locationRating, userId, locationId])
            //update the average rating at the end. NOTE: it returns a rounded integer, which should work well if we use start icons or something
            let avgRating1 = await client.query(`update  ${schema}.locations l
                                    set "avg_rating" = 
                                        (select AVG(ul."rating") 
                                        from  ${schema}.users_locations ul
                                        where ul."location_id" = $1)
                                    where l."location_id" = $1
                                    returning l."avg_rating";`, [locationId]) //can I use two $1? Or should I make it an array?
            //get the average rating
            console.log(avgRating1.rows[0]);            
        } 
      
        if (locationImage) {
           //update the image to the location_images table (path name in bucket vs 64-bit string), using the imageId
            await client.query(`update  ${schema}.location_images li 
                                    set "image" = $1
                                    where li."image_id" = $2`, [locationImage, imageId])
            //insert row in locations_location_images
            await client.query(`insert into  ${schema}.locations_location_images ("location_id", "image_id")
                                    values ($1,$2);`, [locationId, imageId])
            //get all images of a location (their ids and strings)
            let imageResults = await client.query(`select li."image_id", array_agg(distinct (li."image")) as images
                                                        from  ${schema}.location_images li
                                                        left join  ${schema}.locations_location_images lli on li."image_id"=lli."image_id"
                                                        where lli."location_id" = $1
                                                        group by li."image_id";`, [locationId])
            //make an array of Image objects using previous results
            let imageArray: Image[]= imageResults.rows
            console.log(imageArray);
        } 
        
        await client.query('COMMIT;') //end transaction
        //we are not returning anything!
    } catch(e) {
        client && client.query('ROLLBACK;') 
        if (e.message === "Not Found"){
            throw new LocationNotFoundError
        }
        if (e.message === "Not Visited"){
            throw new LocationNotVisitedError
        }
        console.log(e);
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        client && client.release()
    }
}

//the update endpoint for admin
export async function adminUpdateLocation(updatedLocation:Location): Promise<Location> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;') 
        if (updatedLocation.name){
            await client.query(`update  ${schema}.locations set "name" = $1 where "location_id" = $2`, 
                                [updatedLocation.name, updatedLocation.locationId])
        }
        if (updatedLocation.realm){
            await client.query(`update  ${schema}.locations set "realm" = $1 where "location_id" = $2`, 
                                [updatedLocation.realm, updatedLocation.locationId])
        }
        if (updatedLocation.governance){
            await client.query(`update  ${schema}.locations set "governance" = $1 where "location_id" = $2`, 
                                [updatedLocation.governance, updatedLocation.locationId])
        }
        if (updatedLocation.primaryPopulation){
            await client.query(`update  ${schema}.locations set "primary_population" = $1 where "location_id" = $2`, 
                                [updatedLocation.primaryPopulation, updatedLocation.locationId])
        }
    //add that an admin can delete the record of a user visiting? 
    //maybe too complicated...
    await client.query('COMMIT;') //end transaction
    return findLocationById(updatedLocation.locationId)
    } catch(e) {
        client && client.query('ROLLBACK;') //if a js error takes place, send it back
        console.log(e);
        throw new Error ("This error can't be handled, like the way the ring can't be handled by anyone but Frodo")
    } finally {
        client && client.release()
    }

}