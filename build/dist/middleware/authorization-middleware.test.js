"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mockRequest = function () {
    return {
        user: undefined
    };
};
var mockResponse = function () {
    var res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
var authorization_middleware_1 = require("./authorization-middleware");
describe('authorizationMiddleware ', function () {
    var req;
    var res;
    var next;
    //runs our setup before each individual test
    beforeEach(function () {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });
    it('Should not allow someone who is not logged in through', function () {
        //calls the middleware with a non existenent user
        authorization_middleware_1.authorizationMiddleware(req);
        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith('Please Login');
        expect(next).not.toBeCalled();
    });
    it('Should allow through someone who is logged in', function () {
        req.user = {
            username: 'Mithrandir',
            role: 'Admin'
        };
        console.log = jest.fn(); //mock console.log WITH LOGGER
        authorization_middleware_1.authorizationMiddleware(req);
        expect(res.status).not.toBeCalled();
        expect(res.send).not.toBeCalled();
        expect(next).toBeCalled();
        expect(console.log).toBeCalledWith('User Mithrandir has a role of Admin');
    });
});
//# sourceMappingURL=authorization-middleware.test.js.map