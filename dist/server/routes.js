"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require("./config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.use("/api", (0, _expressJwt2.default)({
    secret: _config2.default.jwt.secret,
    credentialsRequired: false
}), require("./api/routes"));

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvcm91dGVzLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsInVzZSIsInNlY3JldCIsImp3dCIsImNyZWRlbnRpYWxzUmVxdWlyZWQiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBR0E7Ozs7OztBQUZBLE1BQU1BLFNBQVMsa0JBQVFDLE1BQVIsRUFBZjs7QUFJQUQsT0FBT0UsR0FBUCxDQUNJLE1BREosRUFFSSwwQkFBSTtBQUNBQyxZQUFRLGlCQUFPQyxHQUFQLENBQVdELE1BRG5CO0FBRUFFLHlCQUFxQjtBQUZyQixDQUFKLENBRkosRUFNSUMsUUFBUSxjQUFSLENBTko7O0FBU0FDLE9BQU9DLE9BQVAsR0FBaUJSLE1BQWpCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgand0IGZyb20gXCJleHByZXNzLWp3dFwiO1xuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi9jb25maWcvY29uZmlnXCI7XG5cbnJvdXRlci51c2UoXG4gICAgXCIvYXBpXCIsXG4gICAgand0KHtcbiAgICAgICAgc2VjcmV0OiBDT05GSUcuand0LnNlY3JldCxcbiAgICAgICAgY3JlZGVudGlhbHNSZXF1aXJlZDogZmFsc2VcbiAgICB9KSxcbiAgICByZXF1aXJlKFwiLi9hcGkvcm91dGVzXCIpXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcbiJdfQ==