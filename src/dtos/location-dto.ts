
//DB version of location
export class LocationDTO {
    location_id: number
	name: string 
	realm:string 
	governance:string 
	primary_population: string 
	description: string
	avg_rating: number 
	num_visited:number
	lat:number
	lng:number
	images:string[] //array of strings
	image_ids:number[]
}