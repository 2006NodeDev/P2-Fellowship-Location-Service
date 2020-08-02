"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTVerifyMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWTVerifyMiddleware = function (req, res, Next) {
    var _a;
    try {
        // ?. operator is really just short hand for the guard operator
        // req.headers.authorization && req.headers.authorization.split(' ').pop()
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').pop(); //turn the string Bearer token -> token
        if (token) {
            req.user = jsonwebtoken_1.default.verify(token, 'thisIsASecret');
        }
        Next(); //no token and no req.user
        //other validation middleware will catch it
    }
    catch (e) {
        console.log(e);
        Next(e);
    }
};
//# sourceMappingURL=jwt-verify-middleware.js.map