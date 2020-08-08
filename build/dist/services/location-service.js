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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateLocationService = exports.userUpdateLocationService = exports.findLocationByIdService = exports.getAllLocationsService = void 0;
var location_dao_1 = require("../daos/SQL/location-dao");
var Cloud_Storage_1 = require("../daos/Cloud-Storage");
var location_images_1 = require("../daos/Cloud-Storage/location-images");
function getAllLocationsService() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, location_dao_1.getAllLocations()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAllLocationsService = getAllLocationsService;
function findLocationByIdService(locationId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, location_dao_1.findLocationById(locationId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findLocationByIdService = findLocationByIdService;
//this is way too complicated
function userUpdateLocationService(locationId, userId, locationVisited, locationRating, locationImage) {
    return __awaiter(this, void 0, void 0, function () {
        var base64Image, _a, dataType, imageBase64Data, contentType, newImage64Object, location, locationImageName, updatedLocation, updatedLocation, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    if (!locationImage) return [3 /*break*/, 6];
                    base64Image = locationImage;
                    _a = base64Image.split(';base64,') // gets us the two important parts of the base 64 string
                    , dataType = _a[0], imageBase64Data = _a[1];
                    contentType = dataType.split('/').pop();
                    return [4 /*yield*/, location_dao_1.addNewImage(imageBase64Data)];
                case 1:
                    newImage64Object = _b.sent();
                    console.log(newImage64Object.imageId);
                    return [4 /*yield*/, location_dao_1.findLocationById(locationId)
                        //need this to get the location name for the path
                        //get rid of the spaces in the location name
                    ];
                case 2:
                    location = _b.sent();
                    locationImageName = location.name.split(" ").join("");
                    console.log(locationImageName);
                    //we need to add the picture path to the location data for the sql database        
                    locationImage = Cloud_Storage_1.bucketBaseUrl + "/LOTR_Locations/" + locationImageName + "-" + newImage64Object.imageId + "." + contentType;
                    console.log(locationImage);
                    //we need to save a picture to cloud storage 
                    //we are adding the imageId so that we can save multiple of the same location
                    return [4 /*yield*/, location_images_1.saveLocationImage(contentType, imageBase64Data, "LOTR_Locations/" + locationImageName + "-" + newImage64Object.imageId + "." + contentType)
                        //update the location in the database
                    ];
                case 3:
                    //we need to save a picture to cloud storage 
                    //we are adding the imageId so that we can save multiple of the same location
                    _b.sent();
                    //update the location in the database
                    return [4 /*yield*/, location_dao_1.userUpdateLocation(locationId, userId, locationVisited, locationRating, locationImage, newImage64Object.imageId)
                        //(making sure to update row in location_images table to have the path, not the 64-bit data)
                    ];
                case 4:
                    //update the location in the database
                    _b.sent();
                    return [4 /*yield*/, location_dao_1.findLocationById(locationId)];
                case 5:
                    updatedLocation = _b.sent();
                    console.log(updatedLocation.image); //check that it's been updating/returning the right thing
                    //for some reason it is ordering the images in alphabetical order.  It won't be a problem when using real data (since images uploaded later will come after) but it's weird
                    return [2 /*return*/, updatedLocation
                        //this way we are updating the location and getting the updated location to send back to the front end
                    ];
                case 6: return [4 /*yield*/, location_dao_1.userUpdateLocation(locationId, userId, locationVisited, locationRating, null, null)
                    //we need to save the updated location data to the sql database (making sure to update row in location_images table to have the path, not the 64-bit data)
                ];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, location_dao_1.findLocationById(locationId)];
                case 8:
                    updatedLocation = _b.sent();
                    return [2 /*return*/, updatedLocation
                        //this way we are updating the location and getting the updated location to send back to the front end
                    ];
                case 9: return [3 /*break*/, 11];
                case 10:
                    e_1 = _b.sent();
                    console.log(e_1);
                    throw e_1;
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.userUpdateLocationService = userUpdateLocationService;
function adminUpdateLocationService(updatedLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var savedLocation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, location_dao_1.adminUpdateLocation(updatedLocation)];
                case 1:
                    savedLocation = _a.sent();
                    console.log(updatedLocation);
                    //just checking it updated corectly
                    return [2 /*return*/, savedLocation];
            }
        });
    });
}
exports.adminUpdateLocationService = adminUpdateLocationService;
//# sourceMappingURL=location-service.js.map