"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mockRequest = function () {
    return {
        session: {
            user: undefined
        }
    };
};
var mockResponse = function () {
    var res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
var authentication_middleware_1 = require("./authentication-middleware");
describe('authenticationMiddleware', function () {
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
        authentication_middleware_1.authenticationMiddleware(req, res, next);
        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith('Please Login');
        expect(next).not.toBeCalled();
    });
    it('Should allow through someone who is logged in', function () {
        req.session.user = {
            username: 'Mithrandir',
            role: 'Admin'
        };
        console.log = jest.fn(); //mock console.log
        authentication_middleware_1.authenticationMiddleware(req, res, next);
        expect(res.status).not.toBeCalled();
        expect(res.send).not.toBeCalled();
        expect(next).toBeCalled();
        expect(console.log).toBeCalledWith('user Mithrandir has a role of Admin');
    });
});
//# sourceMappingURL=authentication-middleware.test.js.map