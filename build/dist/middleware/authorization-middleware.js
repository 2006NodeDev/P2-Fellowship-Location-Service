"use strict";
// different users have different roles
// different roles allow you to do different things
// different endpoints require different roles
//before I allow someone to access an endpoint, I want to make sure they have a role that matches that endpoints allowed roles
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
// utilize the factory pattern, we provide an array of accepted roles, and return a function that allows those roles through
// this function is a middleware factory
function authorizationMiddleware(roles) {
    return function (req, res, next) {
        var allowed = false;
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            if (req.user.role === role) { //we probably want to look for something else now because session will no longer exist
                //we found a matching role, allow them in
                allowed = true;
                next();
            }
        }
        if (!allowed) {
            // if they didn't have a matching role kick em out
            res.status(403).send('YOu have insufficent permissions for this endpoint');
        }
    };
}
exports.authorizationMiddleware = authorizationMiddleware;
// allow admin+manager
//allow only admin
//allow user + manage + admin
//allow user + admin
//# sourceMappingURL=authorization-middleware.js.map