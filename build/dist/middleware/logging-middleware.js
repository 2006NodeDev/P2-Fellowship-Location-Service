"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
// when someone sends us a request, we want to log where the sent it from and what kind of request they sent
function loggingMiddleware(req, res, next) {
    console.log(req.method + " Request from " + req.ip + " to " + req.path + " ");
    next(); // tells express this function is done, and move to the next matching piece of middleware
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging-middleware.js.map