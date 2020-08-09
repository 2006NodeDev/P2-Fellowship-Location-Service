/*const mockRequest = ()=>{
    return {
        user:undefined
    }
}

const mockResponse =() => {
    let res:any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}


import { authorizationMiddleware } from './authorization-middleware'
import { logger } from '../utils/logger'


describe('authorizationMiddleware ', ()=>{
    
    let req;
    let res;
    let next;

    //runs our setup before each individual test
    beforeEach(()=>{
        req = mockRequest()
        res = mockResponse()
        next = jest.fn()
    })

    it('Should not allow someone who is not logged in through', ()=>{
        //calls the middleware with a non existenent user
        authorizationMiddleware (req)
        expect(res.status).toBeCalledWith(401)
        expect(res.send).toBeCalledWith('Please Login')
        expect(next).not.toBeCalled()
    })

    it('Should allow through someone who is logged in', ()=>{
        req.user = {//set up the user object
            username:'Mithrandir',
            role:'Admin'
        }
        logger.debug = jest.fn()//mock console.log WITH LOGGER
        authorizationMiddleware (req)
        expect(res.status).not.toBeCalled()
        expect(res.send).not.toBeCalled()
        expect(next).toBeCalled()
        expect(logger.debug).toBeCalledWith('User Mithrandir has a role of Admin')

    })

})
*/