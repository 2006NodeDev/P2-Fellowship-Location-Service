import { Image } from "./Image"

export class Location {
    locationId: number
	name: string 
    image:Image[] //array?
	realm:string 
	governance:string 
	primaryPopulation: string 
	description: string
	rating: number 
    numVisited:number 
    
    /* for future reference 
    bookId:number//we chose this to be the identifier
    title:string
    authors:string[]//we should probably update this to like a person evenetually
    pages:number
    chapters:number
    publisher:string
    publishingDate:number
    genre:Genre[]
    series:boolean
    numberInSeries:number
    ISBN:string */

    
}