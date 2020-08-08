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
exports.adminUpdateLocation = exports.userUpdateLocation = exports.addNewImage = exports.findLocationById = exports.getAllLocations = void 0;
var _1 = require(".");
var Location_Not_Found_Error_1 = require("../../errors/Location-Not-Found-Error");
var LocationDTO_to_Location_converter_1 = require("../../utils/LocationDTO-to-Location-converter");
var Location_Not_Visted_Error_1 = require("../../errors/Location-Not-Visted-Error");
var ImageDTO_to_Image_Converter_1 = require("../../utils/ImageDTO-to-Image-Converter");
var schema = process.env['P2_SCHEMA'] || 'project_2_location_service';
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
                    return [4 /*yield*/, client.query("select l.\"location_id\", l.\"name\", l.\"realm\", l.\"governance\", l.\"primary_population\", l.\"description\", l.\"avg_rating\", l.\"num_visited\", l.\"lat\", l.\"lng\",\n                                            array_agg(distinct (li.\"image\")) as images,\n                                            array_agg(distinct (li.\"image_id\")) as image_ids\n                                            from " + schema + ".locations l\n                                            left join " + schema + ".locations_location_images lli on l.\"location_id\"=lli.\"location_id\"\n                                            left join " + schema + ".location_images li on li.\"image_id\"=lli.\"image_id\"\n                                            group by l.\"location_id\";")
                        //return results
                        //console.log(results);        
                    ];
                case 2:
                    results = _a.sent();
                    //return results
                    //console.log(results);        
                    console.log(results.rows.map(LocationDTO_to_Location_converter_1.LocationDTOtoLocationConvertor));
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
//find location by ID
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
                    return [4 /*yield*/, client.query("select l.\"location_id\", l.\"name\", l.\"realm\", l.\"governance\", l.\"primary_population\", l.\"description\", l.\"avg_rating\", l.\"num_visited\", l.\"lat\", l.\"lng\",\n                                            array_agg(distinct (li.\"image\")) as images,\n                                            array_agg(distinct (li.\"image_id\")) as image_ids\n                                            from " + schema + ".locations l\n                                            left join " + schema + ".locations_location_images lli on l.\"location_id\"=lli.\"location_id\"\n                                            left join " + schema + ".location_images li on li.\"image_id\"=lli.\"image_id\"\n                                            where l.\"location_id\"=$1\n                                            group by l.\"location_id\";", [locationId])];
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
//add a new image
function addNewImage(image64) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("insert into " + schema + ".location_images(\"image\") \n                                                        values ($1) returning \"image_id\";", [image64])
                        //insert the new image as a 64-bit string in order to get its ID number
                    ];
                case 2:
                    results = _a.sent();
                    //insert the new image as a 64-bit string in order to get its ID number
                    console.log(ImageDTO_to_Image_Converter_1.ImageDTOtoImageConverter(results.rows[0]));
                    //check that stuff is working the way it's supposed to
                    return [2 /*return*/, ImageDTO_to_Image_Converter_1.ImageDTOtoImageConverter(results.rows[0])
                        //we will be using this to name file in bucket        
                    ];
                case 3:
                    e_3 = _a.sent();
                    client && client.query('ROLLBACK;'); //if a js error takes place, send it back
                    console.log(e_3);
                    throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addNewImage = addNewImage;
//is the locations router the best place for this?
//need to get the id number of the current user!
//return array with placesVisite, numVisited, (avg)rating, and Image array .... should it be any[]?
function userUpdateLocation(locationId, userId, locationVisited, locationRating, locationImage, imageId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, userLocation, placesVisited, numVisited, avgRating1, imageResults, imageArray, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, 17, 18]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    if (!locationId) {
                        throw new Error('Not Found');
                    }
                    if (locationVisited === false) { //this might be extra, since checked in router (and to be checked in frontend too), but may as well keep it in
                        throw new Error('Not Visited');
                    }
                    if (!locationVisited) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.query("select * from  " + schema + ".users_locations ul\n                                                    where ul.\"user_id\" = $1 and ul.\"location_id\" =$2;", [userId, locationId])
                        //check the results
                    ];
                case 3:
                    userLocation = _a.sent();
                    //check the results
                    console.log(userLocation.rows[0]);
                    if (!!userLocation) return [3 /*break*/, 7];
                    //add a row to the users_locations table
                    return [4 /*yield*/, client.query("insert into  " + schema + ".users_locations (\"user_id\", \"location_id\")\n                                                    values ($1,$2);", [userId, locationId])
                        //update the number in the places_visited column for the user            
                        //and get the updated places_visited
                    ];
                case 4:
                    //add a row to the users_locations table
                    _a.sent();
                    return [4 /*yield*/, client.query("update  " + schema + ".users u \n                                        set \"places_visited\" = \n                                            (select COUNT(ul.\"location_id\") \n                                            from  " + schema + ".users_locations ul\n                                            where ul.\"user_id\" = $1)\n                                        where u.\"user_id\"=$1\n                                        returning u.\"places_visited\";", [userId])
                        //update the number in num_visited column for the location
                        //get the updated num_visited
                    ];
                case 5:
                    placesVisited = _a.sent();
                    return [4 /*yield*/, client.query("update  " + schema + ".locations l\n                                        set \"num_visited\" = \n                                            (select COUNT(ul.\"user_id\") \n                                            from  " + schema + ".users_locations ul\n                                            where ul.\"location_id\" = $1)\n                                        where l.\"location_id\"=$1\n                                        returning l.\"num_visited\";", [locationId])
                        //check that we are getting values 
                    ];
                case 6:
                    numVisited = _a.sent();
                    //check that we are getting values 
                    console.log(numVisited.rows[0]);
                    console.log(placesVisited.rows[0]);
                    _a.label = 7;
                case 7:
                    if (!(0 <= locationRating && locationRating <= 5)) return [3 /*break*/, 10];
                    //add the rating in the users_locations table
                    return [4 /*yield*/, client.query("update  " + schema + ".users_locations ul\n                                    set \"rating\" = $1 \n                                    where ul.\"user_id\" = $2 and ul.\"location_id\" = $3;", [locationRating, userId, locationId])
                        //update the average rating at the end. NOTE: it returns a rounded integer, which should work well if we use start icons or something
                    ];
                case 8:
                    //add the rating in the users_locations table
                    _a.sent();
                    return [4 /*yield*/, client.query("update  " + schema + ".locations l\n                                    set \"avg_rating\" = \n                                        (select AVG(ul.\"rating\") \n                                        from  " + schema + ".users_locations ul\n                                        where ul.\"location_id\" = $1)\n                                    where l.\"location_id\" = $1\n                                    returning l.\"avg_rating\";", [locationId])
                        //get the average rating
                    ]; //can I use two $1? Or should I make it an array?
                case 9:
                    avgRating1 = _a.sent() //can I use two $1? Or should I make it an array?
                    ;
                    //get the average rating
                    console.log(avgRating1.rows[0]);
                    _a.label = 10;
                case 10:
                    if (!locationImage) return [3 /*break*/, 14];
                    //update the image to the location_images table (path name in bucket vs 64-bit string), using the imageId
                    return [4 /*yield*/, client.query("update  " + schema + ".location_images li \n                                    set \"image\" = $1\n                                    where li.\"image_id\" = $2", [locationImage, imageId])
                        //insert row in locations_location_images
                    ];
                case 11:
                    //update the image to the location_images table (path name in bucket vs 64-bit string), using the imageId
                    _a.sent();
                    //insert row in locations_location_images
                    return [4 /*yield*/, client.query("insert into  " + schema + ".locations_location_images (\"location_id\", \"image_id\")\n                                    values ($1,$2);", [locationId, imageId])
                        //get all images of a location (their ids and strings)
                    ];
                case 12:
                    //insert row in locations_location_images
                    _a.sent();
                    return [4 /*yield*/, client.query("select li.\"image_id\", array_agg(distinct (li.\"image\")) as images\n                                                        from  " + schema + ".location_images li\n                                                        left join  " + schema + ".locations_location_images lli on li.\"image_id\"=lli.\"image_id\"\n                                                        where lli.\"location_id\" = $1\n                                                        group by li.\"image_id\";", [locationId])
                        //make an array of Image objects using previous results
                    ];
                case 13:
                    imageResults = _a.sent();
                    imageArray = imageResults.rows;
                    console.log(imageArray);
                    _a.label = 14;
                case 14: return [4 /*yield*/, client.query('COMMIT;')
                    //we are not returning anything!
                ]; //end transaction
                case 15:
                    _a.sent(); //end transaction
                    return [3 /*break*/, 18];
                case 16:
                    e_4 = _a.sent();
                    client && client.query('ROLLBACK;');
                    if (e_4.message === "Not Found") {
                        throw new Location_Not_Found_Error_1.LocationNotFoundError;
                    }
                    if (e_4.message === "Not Visited") {
                        throw new Location_Not_Visted_Error_1.LocationNotVisitedError;
                    }
                    console.log(e_4);
                    throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
                case 17:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.userUpdateLocation = userUpdateLocation;
//the update endpoint for admin
function adminUpdateLocation(updatedLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, 13, 14]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    if (!updatedLocation.name) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.query("update  " + schema + ".locations set \"name\" = $1 where \"location_id\" = $2", [updatedLocation.name, updatedLocation.locationId])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!updatedLocation.realm) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.query("update  " + schema + ".locations set \"realm\" = $1 where \"location_id\" = $2", [updatedLocation.realm, updatedLocation.locationId])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!updatedLocation.governance) return [3 /*break*/, 8];
                    return [4 /*yield*/, client.query("update  " + schema + ".locations set \"governance\" = $1 where \"location_id\" = $2", [updatedLocation.governance, updatedLocation.locationId])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!updatedLocation.primaryPopulation) return [3 /*break*/, 10];
                    return [4 /*yield*/, client.query("update  " + schema + ".locations set \"primary_population\" = $1 where \"location_id\" = $2", [updatedLocation.primaryPopulation, updatedLocation.locationId])];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: 
                //add that an admin can delete the record of a user visiting? 
                //maybe too complicated...
                return [4 /*yield*/, client.query('COMMIT;')]; //end transaction
                case 11:
                    //add that an admin can delete the record of a user visiting? 
                    //maybe too complicated...
                    _a.sent(); //end transaction
                    return [2 /*return*/, findLocationById(updatedLocation.locationId)];
                case 12:
                    e_5 = _a.sent();
                    client && client.query('ROLLBACK;'); //if a js error takes place, send it back
                    console.log(e_5);
                    throw new Error("This error can't be handled, like the way the ring can't be handled by anyone but Frodo");
                case 13:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.adminUpdateLocation = adminUpdateLocation;
//# sourceMappingURL=location-dao.js.map