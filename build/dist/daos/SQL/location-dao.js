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
exports.userUpdateLocation = exports.findLocationById = exports.getAllLocations = void 0;
var _1 = require(".");
var Location_Not_Found_Error_1 = require("../../errors/Location-Not-Found-Error");
var LocationDTO_to_Location_converter_1 = require("../../utils/LocationDTO-to-Location-converter");
var Location_Not_Visted_Error_1 = require("../../errors/Location-Not-Visted-Error");
//const schema = process.env['LB_SCHEMA'] || 'lightlyburning_book_service' must uncomment
function getAllLocations() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()
                        //send query
                    ];
                case 1:
                    //get connection
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select l.\"location_id\", l.\"name\", l.\"realm\", l.\"governance\", l.\"primary_population\", l.\"description\", l.\"avg_rating\", l.\"num_visited\", \n                                            array_agg(distinct (li.\"image\")) as images\n                                            from project_2.locations l\n                                            left join project_2.locations_location_images lli on l.\"location_id\"=lli.\"location_id\"\n                                            left join project_2.location_images li on li.\"image_id\"=lli.\"image_id\"\n                                            group by l.\"location_id\";")
                        //return results
                    ];
                case 2:
                    results = _a.sent();
                    //return results
                    console.log(results);
                    return [2 /*return*/, results.rows.map(LocationDTO_to_Location_converter_1.LocationDTOtoLocationConvertor)];
                case 3:
                    e_1 = _a.sent();
                    //if we get an error we don't know
                    console.log(e_1);
                    throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
                case 4:
                    // we make sure client isn't undefined
                    client && client.release(); //then we release it
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllLocations = getAllLocations;
function findLocationById(locationId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //id = '1 or 1 = 1; drop table l${schema}.books cascade; select * from l${schema}.book '
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select l.\"location_id\", l.\"name\", l.\"realm\", l.\"governance\", l.\"primary_population\", l.\"description\", l.\"avg_rating\", l.\"num_visited\", \n                                            array_agg(distinct (li.\"image\")) as images\n                                            from project_2.locations l\n                                            left join project_2.locations_location_images lli on l.\"location_id\"=lli.\"location_id\"\n                                            left join project_2.location_images li on li.\"image_id\"=lli.\"image_id\"\n                                            where l.\"location_id\"=$1\n                                            group by l.\"location_id\";", [locationId])];
                case 2:
                    results = _a.sent();
                    console.log(results.rows[0]);
                    if (results.rowCount === 0) {
                        throw new Error('NotFound');
                    }
                    else {
                        return [2 /*return*/, LocationDTO_to_Location_converter_1.LocationDTOtoLocationConvertor(results.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    if (e_2.message === 'NotFound') {
                        throw new Location_Not_Found_Error_1.LocationNotFoundError();
                    }
                    console.log(e_2);
                    throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findLocationById = findLocationById;
//is the locations router the best place for this?
//need to get the id number of the current user!
//return array with placesVisite, numVisited, (avg)rating, and Image array .... should it be any[]?
function userUpdateLocation(locationId, userId, locationVisited, locationRating, locationImage) {
    return __awaiter(this, void 0, void 0, function () {
        var client, returnArray, userPlacesVisited, locationNumVisited, avgRating, oldAvgRating, imageId, imageResults, imageArray, imageResults, oldImageArray, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 22, 23, 24]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    returnArray = void 0;
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    if (!locationId) {
                        throw new Error('Not Found');
                    }
                    if (locationVisited === false) { //this might be extra, since checked in router (and to be checked in frontend too), but may as well keep it in
                        throw new Error('Not Visited');
                    }
                    if (!locationVisited) return [3 /*break*/, 8];
                    //add a row to the users_locations table
                    return [4 /*yield*/, client.query("insert into project_2.users_locations (\"user_id\", \"location_id\")\n                                    values ($1,$2);", [userId, locationId])
                        //update the number in the places_visited column for the user
                    ];
                case 3:
                    //add a row to the users_locations table
                    _a.sent();
                    //update the number in the places_visited column for the user
                    return [4 /*yield*/, client.query("update project_2.users \n                                    set \"places_visited\" = \n                                        (select COUNT(ul.\"location_id\") \n                                        from project_2.users_locations ul\n                                        where ul.\"user_id\" = $1)\n                                    where \"user_id\"=$1;", [userId])
                        //get the updated places_visited
                    ]; //can I use two $1? Or should I make it an array?
                case 4:
                    //update the number in the places_visited column for the user
                    _a.sent(); //can I use two $1? Or should I make it an array?
                    return [4 /*yield*/, client.query("select u.\"places_visited\" \n                                                            from  project_2.users u \n                                                            where u.\"user_id\"=$1;", [userId])
                        //update the number in num_visited column for the location
                    ];
                case 5:
                    userPlacesVisited = _a.sent();
                    //update the number in num_visited column for the location
                    return [4 /*yield*/, client.query("update project_2.locations \n                                    set \"num_visited\" = \n                                        (select COUNT(ul.\"user_id\") \n                                        from project_2.users_locations ul\n                                        where ul.\"location_id\" = $1)\n                                    where \"location_id\"=$1;", [locationId])
                        //get the updated num_visited
                    ]; //can I use two $1? Or should I make it an array?
                case 6:
                    //update the number in num_visited column for the location
                    _a.sent(); //can I use two $1? Or should I make it an array?
                    return [4 /*yield*/, client.query("select l.\"num_visited\" \n                                                            from  project_2.locations l \n                                                            where l.\"location_id\"=$1;"[locationId])
                        //add the places_visited and num_visited to the returnArray
                    ];
                case 7:
                    locationNumVisited = _a.sent();
                    //add the places_visited and num_visited to the returnArray
                    console.log(userPlacesVisited);
                    console.log(locationNumVisited);
                    returnArray.push(userPlacesVisited, locationNumVisited);
                    console.log(returnArray);
                    _a.label = 8;
                case 8:
                    if (!locationRating) return [3 /*break*/, 12];
                    //add the rating in the users_locations table
                    return [4 /*yield*/, client.query("update project_2.users_locations \n                                    set \"rating\" = $1 \n                                    where \"user_id\" = $2 and \"location_id\" = $3;", [locationRating, userId, locationId])
                        //update the average rating at the end. NOTE: it returns a rounded integer, which should work well if we use start icons or something
                    ];
                case 9:
                    //add the rating in the users_locations table
                    _a.sent();
                    //update the average rating at the end. NOTE: it returns a rounded integer, which should work well if we use start icons or something
                    return [4 /*yield*/, client.query("update project_2.locations \n                                    set \"avgRating\" = \n                                        (select AVG(ul.\"rating\") \n                                        from project_2.users_locations ul\n                                        where ul.\"location_id\" = $1)\n                                    where \"location_id\" = $1;", [locationId])
                        //get the average rating
                    ]; //can I use two $1? Or should I make it an array?
                case 10:
                    //update the average rating at the end. NOTE: it returns a rounded integer, which should work well if we use start icons or something
                    _a.sent(); //can I use two $1? Or should I make it an array?
                    return [4 /*yield*/, client.query("select l.\"avg_rating\" \n                                                    from project_2.locations l \n                                                    where l.\"location_id\"=$1;", [locationId])
                        //add to the returnArray
                    ];
                case 11:
                    avgRating = _a.sent();
                    //add to the returnArray
                    console.log(avgRating);
                    returnArray.push(avgRating);
                    console.log(returnArray);
                    _a.label = 12;
                case 12:
                    if (!!locationRating) return [3 /*break*/, 14];
                    return [4 /*yield*/, client.query("select l.\"avg_rating\" \n                                                    from project_2.locations l \n                                                    where l.\"location_id\"=$1;", [locationId])
                        //add to the returnArray
                    ];
                case 13:
                    oldAvgRating = _a.sent();
                    //add to the returnArray
                    console.log(oldAvgRating);
                    returnArray.push(oldAvgRating);
                    console.log(returnArray);
                    _a.label = 14;
                case 14:
                    if (!locationImage) return [3 /*break*/, 18];
                    return [4 /*yield*/, client.query("insert into project_2.location_images (\"image\")\n                                                values ('$1'); returning \"image_id\"", [locationImage])
                        //insert row in locations_location_images
                    ];
                case 15:
                    imageId = _a.sent();
                    //insert row in locations_location_images
                    return [4 /*yield*/, client.query("insert into project_2.locations_location_images (\"location_id\", \"image_id\")\n                                    values ($1,$2);", [locationId, imageId])
                        //get all images of a location (their ids and strings)
                    ];
                case 16:
                    //insert row in locations_location_images
                    _a.sent();
                    return [4 /*yield*/, client.query("select li.\"image_id\", array_agg(distinct (li.\"image\")) as images\n                                                        from project_2.location_images li\n                                                        left join project_2.locations_location_images lli on li.\"image_id\"=lli.\"image_id\"\n                                                        where lli.\"location_id\" = $1\n                                                        group by li.\"image_id\";", [locationId])
                        //make an array of Image objects using previous results
                    ];
                case 17:
                    imageResults = _a.sent();
                    imageArray = imageResults.rows;
                    console.log(imageArray);
                    //add to returnArray
                    returnArray.push(imageArray);
                    console.log(returnArray);
                    _a.label = 18;
                case 18:
                    if (!!locationImage) return [3 /*break*/, 20];
                    return [4 /*yield*/, client.query("select li.\"image_id\", array_agg(distinct (li.\"image\")) as images\n                                                        from project_2.location_images li\n                                                        left join project_2.locations_location_images lli on li.\"image_id\"=lli.\"image_id\"\n                                                        where lli.\"location_id\" = $1\n                                                        group by li.\"image_id\";", [locationId])
                        //make an array of Image objects using previous results
                    ];
                case 19:
                    imageResults = _a.sent();
                    oldImageArray = imageResults.rows;
                    console.log(oldImageArray);
                    //add to returnArray
                    returnArray.push(oldImageArray);
                    console.log(returnArray);
                    _a.label = 20;
                case 20: return [4 /*yield*/, client.query('COMMIT;')]; //end transaction
                case 21:
                    _a.sent(); //end transaction
                    console.log(returnArray);
                    return [3 /*break*/, 24];
                case 22:
                    e_3 = _a.sent();
                    client && client.query('ROLLBACK;');
                    if (e_3.message === "Not Found") {
                        throw new Location_Not_Found_Error_1.LocationNotFoundError;
                    }
                    if (e_3.message === "Not Visited") {
                        throw new Location_Not_Visted_Error_1.LocationNotVisitedError;
                    }
                    console.log(e_3);
                    throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
                case 23:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 24: return [2 /*return*/];
            }
        });
    });
}
exports.userUpdateLocation = userUpdateLocation;
// //the update endpoint for admin
// export async function updateLocation(updatedLocation:Location): Promise<Location> {
//     let client: PoolClient
//     try {
//         client = await connectionPool.connect()
//         await client.query('BEGIN;') 
//         if (updatedLocation.name){
//         }
//         if (updatedLocation.realm){
//         }
//         if (updatedLocation.governance){
//         }
//         if (updatedLocation.primaryPopulation){
//         }
//         if (updatedLocation.description){
//         }
//         if (updatedLocation.rating){
//         }
//         if (updatedLocation.name){
//         }
//         if (updatedLocation.name){
//         }
//     } catch(e) {
//     } finally {
//         client && client.release()
//     }
// }
//# sourceMappingURL=location-dao.js.map