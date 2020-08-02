"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logging_middleware_1 = require("./middleware/logging-middleware");
var cors_filter_1 = require("./middleware/cors-filter");
var jwt_verify_middleware_1 = require("./middleware/jwt-verify-middleware");
var location_router_1 = require("./routers/location-router");
// import './messaging/index'
// import './messaging/user-service-event-listeners'
// const basePath = process.env['P2_BASE_PATH'] || '' //use / if there is no other base path provided
var app = express_1.default();
app.use(express_1.default.json({ limit: '50mb' }));
//need to increase max size of body we can parse, in order to allow for images
app.use(logging_middleware_1.loggingMiddleware);
//we should probably update these
app.use(cors_filter_1.corsFilter);
app.use(jwt_verify_middleware_1.JWTVerifyMiddleware);
//const basePathRouter = express.Router()
//app.use(basePath, basePathRouter)
//app.use(authenticationMiddleware) this makes us unable to login... but do we want it?
app.use('/locations', location_router_1.locationRouter); // redirect all requests on /locations to the router
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
// the error handler we wrote that express redirects top level errors to
app.use(function (err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).send(err.message);
    }
    else {
        console.log(err); //log it out for us to debug
        //send a generic error response
        res.status(500).send('Oops, Something went wrong');
    }
});
app.listen(2006, function () {
    console.log('Server has started');
});
//# sourceMappingURL=index.js.map