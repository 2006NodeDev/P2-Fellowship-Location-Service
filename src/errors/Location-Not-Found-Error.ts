import { HttpError } from "./Http-Error";

export class LocationNotFoundError extends HttpError{
    constructor(){
        super(404, 'That location does not exist')
    }
}