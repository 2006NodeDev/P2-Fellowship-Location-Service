import { HttpError } from "./Http-Error";

export class LocationNotVisitedError extends HttpError{
    constructor(){
        super(404, 'You must visit a location in order to rate it or upload a photo')
    }
}

