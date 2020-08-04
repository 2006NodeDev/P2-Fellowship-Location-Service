import { Image } from "./Image"

//Location model to keep track of location info

export class Location {
    locationId: number //primary key
	name: string 
    image:Image[] //array of image objects
	realm:string 
	governance:string 
	primaryPopulation: string 
	description: string
	rating: number //the average of ratings from the locations/users joint table
    numVisited:number //based on rows in locations/users joint table
}