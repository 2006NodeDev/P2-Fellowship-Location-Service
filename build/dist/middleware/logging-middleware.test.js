"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//same test, but with loggers
var mockRequest = function () {
    return {
        method: undefined
    };
};
var mockResponse = function () {
    var res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
var logging_middleware_1 = require("../middleware/logging-middleware");
describe('loggingMiddleware', function () {
    var req;
    var res;
    var next;
    //runs our setup before each individual test
    beforeEach(function () {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });
    it('Should allow log request ', function () {
        logging_middleware_1.loggingMiddleware(req, res, next);
        expect(next).toBeCalled();
    });
    /*
     it('Should not allow log request', ()=>{
         loggingMiddleware(req,res, next)
         expect(res.status).toBeCalled()
         expect(res.send).toBeCalled()
         expect(next).not.toBeCalled()
     })
  */
});
//# sourceMappingURL=logging-middleware.test.js.map