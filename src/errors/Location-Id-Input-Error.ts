import { HttpError } from "./Http-Error";

export class LocationIdInputError extends HttpError{
    constructor(){
        super(400, 'Id must be a number')
    }
}