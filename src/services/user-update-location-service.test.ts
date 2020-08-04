
//define a mock function for request
const mockRequest = ()=>{
    return {
        //we just need the user object
        user:undefined
    }
}

//define mock function for response
const mockResponse =() => {
    let res:any = {} //the res object needs status and send
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

import { userUpdateLocationService } from "./location-service"

describe('userUpdateLocationService', ()=>{

    //put these in params?
    let locationId: number
    let userId: number 
    let locationVisited: boolean
    let locationRating: number
    let locationImage: string

    //we still need these, but is this how we should declare them?
    let req;
    let res;
    let next;

    //runs our setup before each individual test
    beforeEach(()=>{
        req = mockRequest()
        res = mockResponse()
        next = jest.fn()
    })

    //this seems like more of a dao test...
    it('Should not allow update because location not found', ()=>{
        //set variables to pass in?
        userUpdateLocationService(locationId, userId, locationVisited, locationRating, locationImage)
        expect(res.status).toBeCalledWith(404)
        expect(res.send).toBeCalledWith('That location does not exist')
        expect(next).not.toBeCalled
    })
    //this seems like more of a dao test...
    it('Should not allow update if location was not visited', ()=>{
        //set variables to pass in?
        userUpdateLocationService(locationId, userId, locationVisited, locationRating, locationImage)
        expect(res.status).toBeCalledWith(404)
        expect(res.send).toBeCalledWith('You must visit a location in order to rate it or upload a photo')
        expect(next).not.toBeCalled
    })
    //this seems like more of a dao test
    //success case
})