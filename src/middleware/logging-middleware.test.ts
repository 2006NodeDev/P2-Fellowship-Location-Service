//same test, but with loggers
const mockRequest = ()=>{
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
 
import { loggingMiddleware } from '../middleware/logging-middleware'
 
describe('loggingMiddleware', ()=>{
    
    let req;
    let res;
    let next;
 
    //runs our setup before each individual test
    beforeEach(()=>{
        req = mockRequest()
        res = mockResponse()
        next = jest.fn()
    })
 
    it('Should allow log request ', ()=>{
        req.user = {//set up the user object
            method:'Mithrandir',
            ip:'12',
            path: '/login'
        }
        console.log = jest.fn()
        loggingMiddleware(req,res, next)
        expect(next).toBeCalled()
        //expect(console.log).toBeCalledWith('Mithrandir Request from 12 to /login ')
    })

   
    it('Should not allow log request', ()=>{
        loggingMiddleware(req,res, next)
        expect(res.status).not.toBeCalled()
        expect(res.send).not.toBeCalled()
        expect(next).toBeCalled()
    })
 
})