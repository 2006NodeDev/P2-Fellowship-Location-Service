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
exports.LocationIdNumberNeededError = void 0;
var Http_Error_1 = require("./Http-Error");
//for when trying to retrieve user information by id number
var LocationIdNumberNeededError = /** @class */ (function (_super) {
    __extends(LocationIdNumberNeededError, _super);
    function LocationIdNumberNeededError() {
        var _this = this;
        var num = "number";
        _this = _super.call(this, 400, "Please provide a location id " + num.italics()) || this;
        return _this;
    }
    return LocationIdNumberNeededError;
}(Http_Error_1.HttpError));
exports.LocationIdNumberNeededError = LocationIdNumberNeededError;
//# sourceMappingURL=Location-Id-Number-Needed-Error.js.map