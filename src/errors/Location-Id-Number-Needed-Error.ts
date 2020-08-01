
import { HttpError } from "./Http-Error";

//for when trying to retrieve user information by id number

export class LocationIdNumberNeededError extends HttpError {
    constructor (){
        let num:string = "number"
        super (400, `Please provide a location id ${num.italics()}`)
    }
}