"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
var express_1 = __importDefault(require("express"));
var location_service_1 = require("../services/location-service");
var Location_Id_Input_Error_1 = require("../errors/Location-Id-Input-Error");
var Location_Id_Number_Needed_Error_1 = require("../errors/Location-Id-Number-Needed-Error");
var Location_Not_Visted_Error_1 = require("../errors/Location-Not-Visted-Error");
var authentication_middleware_1 = require("../middleware/authentication-middleware");
exports.locationRouter = express_1.default.Router();
//we're setting this here and not in the index
exports.locationRouter.use(authentication_middleware_1.authenticationMiddleware);
//GET all locations
exports.locationRouter.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var locations, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, location_service_1.getAllLocationsService()];
            case 1:
                locations = _a.sent();
                res.json(locations);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET location by id
exports.locationRouter.get('/:locationId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var locationId, location, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                locationId = req.params.locationId;
                if (!isNaN(+locationId)) return [3 /*break*/, 1];
                next(new Location_Id_Input_Error_1.LocationIdInputError());
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, location_service_1.findLocationByIdService(+locationId)];
            case 2:
                location = _a.sent();
                res.json(location);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//PATCH user update 
exports.locationRouter.patch('/update/:locationId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var locationIdIput, locationId, _a, visited, rating, image, updatesMade, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                locationIdIput = req.params;
                locationId = +locationIdIput;
                _a = req.body, visited = _a.visited, rating = _a.rating, image = _a.image;
                if (!(!locationId || isNaN(+locationId))) return [3 /*break*/, 1];
                next(new Location_Id_Number_Needed_Error_1.LocationIdNumberNeededError);
                return [3 /*break*/, 5];
            case 1:
                if (!(visited === false)) return [3 /*break*/, 2];
                next(new Location_Not_Visted_Error_1.LocationNotVisitedError);
                return [3 /*break*/, 5];
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, location_service_1.userUpdateLocationService(locationId, req.user.userId, visited, rating, image)];
            case 3:
                updatesMade = _b.sent();
                console.log(updatesMade);
                res.status(200).send("Your contribution has been taken into consideration");
                return [3 /*break*/, 5];
            case 4:
                e_3 = _b.sent();
                next(e_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// //possible patch? for admin
// locationRouter.patch('/update/:locationId', async (req:Request, res:Response, next:NextFunction) => {
//     let {locationId} = req.params
//     //get user id
//     let { name,
//         image,//array?
//         realm, 
//         governance,
//         primaryPopulation, 
//         description,
//         rating, 
//         numVisited} = req.body
//     console.log(req.body)
//     if(!locationId || isNaN(+locationId)) { 
//        next (new LocationIdNumberNeededError)    
//     } else {
//        //updated the num_visited and places_visited for locations and users resp.
//        //add a photo to the array 
//        //add a rating, then upate the locations rating average    
//         let updatedLocation:Location = 
//         { 
//             locationId, 
//             name,
//             image,//array?
//             realm, 
//             governance,
//             primaryPopulation, 
//             description,
//             rating, 
//             numVisited
//         }
//         updatedLocation.name = name || undefined
//         updatedLocation.image = image || undefined
//         updatedLocation.realm =  realm || undefined
//         updatedLocation.governance =  governance || undefined
//         updatedLocation.primaryPopulation = primaryPopulation || undefined
//         updatedLocation.rating =  rating || undefined
//         updatedLocation.numVisited = numVisited || undefined
//         try 
//         {
//             let updatedLocationResults = await updatelocationInfo(updatedLocation)
//             res.json(updatedLocationResults)
//         } 
//         catch (e) 
//         {
//             next(e)
//         }
//     }
// })
/*for a new location!
locationRouter.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    let
    {
        name,
        image,//array?
        realm,
        governance,
        primaryPopulation,
        governance,
        rating,
        numVisited,
         } = req.body //this is destructuring
    // warning if data is allowed to be null or 0, or false, this check is not sufficient
    if (locationId && genre && authors && publishingDate && publisher && pages && chapters && title && ISBN && (!series && numVisitedof (series) === 'boolean' || series) && numberInSeries) {
        //locations.push({ locationId, genre, authors, publisher, publishingDate, pages, chapters, title, series, numberInSeries, ISBN })
        //send description just sents an empty response with the  description code provided
        res.send(201)//201 is created
    } else {
        // . description sets the  description code but deson't send res
        // .send can send a response in many different content-numVisiteds
        throw new LocationUserInputError()
    }
})

*/ 
//# sourceMappingURL=location-router.js.map