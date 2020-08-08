"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
function authenticationMiddleware(req, res, next) {
    if (!req.user) { //we probably want to look for something else now because session will no longer exist
        res.status(401).send('Please Login'); // this could be an error as well
    }
    else {
        console.log("User " + req.user.username + " has a role of " + req.user.role);
        next();
    }
}
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authentication-middleware.js.map