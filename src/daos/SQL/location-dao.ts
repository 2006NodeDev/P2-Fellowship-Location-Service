import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { LocationNotFoundError } from "../../errors/Location-Not-Found-Error";
import { LocationDTOtoLocationConvertor } from "../../utils/LocationDTO-to-Location-converter";
import { Location } from "../../models/Location";
import { Image } from "../../models/Image";
import { LocationNotVisitedError } from "../../errors/Location-Not-Visted-Error";


//const schema = process.env['LB_SCHEMA'] || 'lightlyburning_book_service' must uncomment

export async function getAllLocations(): Promise<Location[]> {
    //first, decleare a client
    let client: PoolClient;
    try {
        //get connection
        client = await connectionPool.connect()
        //send query
        let results: QueryResult = await client.query(`select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
                                            array_agg(distinct (li."image")) as images
                                            from project_2.locations l
                                            left join project_2.locations_location_images lli on l."location_id"=lli."location_id"
                                            left join project_2.location_images li on li."image_id"=lli."image_id"
                                            group by l."location_id";`)
        //return results
        console.log(results);        
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

export async function findLocationById(locationId:number): Promise<Location> {
    let client: PoolClient;
    try{
        //id = '1 or 1 = 1; drop table l${schema}.books cascade; select * from l${schema}.book '
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
                                            array_agg(distinct (li."image")) as images
                                            from project_2.locations l
                                            left join project_2.locations_location_images lli on l."location_id"=lli."location_id"
                                            left join project_2.location_images li on li."image_id"=lli."image_id"
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

//is the locations router the best place for this?
//need to get the id number of the current user!
//return array with placesVisite, numVisited, (avg)rating, and Image array .... should it be any[]?
export async function userUpdateLocation(locationId: number, userId: number, locationVisited: Boolean, locationRating: number, locationImage:string){
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let returnArray:any[]
        await client.query('BEGIN;') 
        if (!locationId){
            throw new Error('Not Found')
        }
        if (locationVisited === false) { //this might be extra, since checked in router (and to be checked in frontend too), but may as well keep it in
            throw new Error('Not Visited')
        }
        if (locationVisited) {
            //add a row to the users_locations table
            await client.query(`insert into project_2.users_locations ("user_id", "location_id")
                                    values ($1,$2);`, [userId, locationId])
            //update the number in the places_visited column for the user
            await client.query(`update project_2.users 
                                    set "places_visited" = 
                                        (select COUNT(ul."location_id") 
                                        from project_2.users_locations ul
                                        where ul."user_id" = $1)
                                    where "user_id"=$1;`, [userId]) //can I use two $1? Or should I make it an array?
            //get the updated places_visited
            let userPlacesVisited = await client.query(`select u."places_visited" 
                                                            from  project_2.users u 
                                                            where u."user_id"=$1;`, [userId])
            //update the number in num_visited column for the location
            await client.query(`update project_2.locations 
                                    set "num_visited" = 
                                        (select COUNT(ul."user_id") 
                                        from project_2.users_locations ul
                                        where ul."location_id" = $1)
                                    where "location_id"=$1;`, [locationId]) //can I use two $1? Or should I make it an array?
            //get the updated num_visited
            let locationNumVisited =  await client.query(`select l."num_visited" 
                                                            from  project_2.locations l 
                                                            where l."location_id"=$1;` [locationId])
            //add the places_visited and num_visited to the returnArray
            console.log(userPlacesVisited);
            console.log(locationNumVisited);            
            returnArray.push(userPlacesVisited, locationNumVisited)
            console.log(returnArray);
        }
        if (locationRating) {
            //add the rating in the users_locations table
            await client.query(`update project_2.users_locations 
                                    set "rating" = $1 
                                    where "user_id" = $2 and "location_id" = $3;`, [locationRating, userId, locationId])
            //update the average rating at the end. NOTE: it returns a rounded integer, which should work well if we use start icons or something
            await client.query(`update project_2.locations 
                                    set "avgRating" = 
                                        (select AVG(ul."rating") 
                                        from project_2.users_locations ul
                                        where ul."location_id" = $1)
                                    where "location_id" = $1;`, [locationId]) //can I use two $1? Or should I make it an array?
            //get the average rating
            let avgRating = await client.query(`select l."avg_rating" 
                                                    from project_2.locations l 
                                                    where l."location_id"=$1;`, [locationId])
            //add to the returnArray
            console.log(avgRating);
            returnArray.push(avgRating)
            console.log(returnArray);
        } //if rating not give, just return the previous average (so the stop in the array is the same)
        if (!locationRating) {
            let oldAvgRating = await client.query(`select l."avg_rating" 
                                                    from project_2.locations l 
                                                    where l."location_id"=$1;`, [locationId])
            //add to the returnArray
            console.log(oldAvgRating);
            returnArray.push(oldAvgRating)
            console.log(returnArray);
        }//////////////////////////////////////////////iffy
        if (locationImage) {
            //add the image to the location_images table, get its image_id
            let imageId = await client.query(`insert into project_2.location_images ("image")
                                                values ('$1'); returning "image_id"`, [locationImage])
            //insert row in locations_location_images
            await client.query(`insert into project_2.locations_location_images ("location_id", "image_id")
                                    values ($1,$2);`, [locationId, imageId])
            //get all images of a location (their ids and strings)
            let imageResults = await client.query(`select li."image_id", array_agg(distinct (li."image")) as images
                                                        from project_2.location_images li
                                                        left join project_2.locations_location_images lli on li."image_id"=lli."image_id"
                                                        where lli."location_id" = $1
                                                        group by li."image_id";`, [locationId])
            //make an array of Image objects using previous results
            let imageArray: Image[]= imageResults.rows
            console.log(imageArray);
            //add to returnArray
            returnArray.push(imageArray)
            console.log(returnArray);
        } //if no new image, get old ones in array
        if (!locationImage) {
            //get all the images that already belong to that location
            let imageResults = await client.query(`select li."image_id", array_agg(distinct (li."image")) as images
                                                        from project_2.location_images li
                                                        left join project_2.locations_location_images lli on li."image_id"=lli."image_id"
                                                        where lli."location_id" = $1
                                                        group by li."image_id";`, [locationId])
            //make an array of Image objects using previous results
            let oldImageArray: Image[]= imageResults.rows
            console.log(oldImageArray);
            //add to returnArray
            returnArray.push(oldImageArray)
            console.log(returnArray);
        }
        await client.query('COMMIT;') //end transaction
        console.log(returnArray);
        //return returnArray;  let's actually not return anything
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


// //the update endpoint for admin
// export async function updateLocation(updatedLocation:Location): Promise<Location> {
//     let client: PoolClient
//     try {
//         client = await connectionPool.connect()
//         await client.query('BEGIN;') 
//         if (updatedLocation.name){

//         }
//         if (updatedLocation.realm){
            
//         }
//         if (updatedLocation.governance){
            
//         }
//         if (updatedLocation.primaryPopulation){
            
//         }
//         if (updatedLocation.description){
            
//         }
//         if (updatedLocation.rating){
            
//         }
//         if (updatedLocation.name){
            
//         }
//         if (updatedLocation.name){
            
//         }
//     } catch(e) {

//     } finally {
//         client && client.release()
//     }

// }