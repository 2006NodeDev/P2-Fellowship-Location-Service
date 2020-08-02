"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServiceBaseClient = void 0;
var axios_1 = __importDefault(require("axios"));
//an optional env for host address or localhost default
var baseURL = process.env['http://localhost:2007']; // || LB_USER_SERVICE_HOST'
exports.userServiceBaseClient = axios_1.default.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//# sourceMappingURL=index.js.map