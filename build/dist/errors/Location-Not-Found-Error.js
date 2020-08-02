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
exports.LocationNotFoundError = void 0;
var Http_Error_1 = require("./Http-Error");
var LocationNotFoundError = /** @class */ (function (_super) {
    __extends(LocationNotFoundError, _super);
    function LocationNotFoundError() {
        return _super.call(this, 404, 'That location does not exist') || this;
    }
    return LocationNotFoundError;
}(Http_Error_1.HttpError));
exports.LocationNotFoundError = LocationNotFoundError;
//# sourceMappingURL=Location-Not-Found-Error.js.map