"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationNotVisitedError = void 0;
var Http_Error_1 = require("./Http-Error");
var LocationNotVisitedError = /** @class */ (function (_super) {
    __extends(LocationNotVisitedError, _super);
    function LocationNotVisitedError() {
        return _super.call(this, 404, 'You must visit a location in order to rate it or upload a photo') || this;
    }
    return LocationNotVisitedError;
}(Http_Error_1.HttpError));
exports.LocationNotVisitedError = LocationNotVisitedError;
//# sourceMappingURL=Location-Not-Visted-Error.js.map