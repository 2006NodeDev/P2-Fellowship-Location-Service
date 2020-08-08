//same test, but with loggers
const mockRequest = ()=>{
    return {
        method:undefined
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
      
        loggingMiddleware(req,res, next)
        expect(next).toBeCalled()
    })

   /*
    it('Should not allow log request', ()=>{
        loggingMiddleware(req,res, next)
        expect(res.status).toBeCalled()
        expect(res.send).toBeCalled()
        expect(next).not.toBeCalled()
    })
 */
})