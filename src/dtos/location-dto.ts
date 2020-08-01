//DB version
export class LocationDTO {
    location_id: number
	name: string 
	realm:string 
	governance:string 
	primary_population: string 
	description: string
	avg_rating: number 
	num_visited:number
	images:string[] //array? 
}