"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../../config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/", function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;


    if (_config2.default.auth.username === username && _config2.default.auth.password === password) {
        var payload = {
            isAuthenticated: true
        };
        var expiration = { expiresIn: 86400 }; // 24 hour expiration

        // Generate the token
        var token = _jsonwebtoken2.default.sign(payload, _config2.default.jwt.secret, expiration);
        res.json({
            status: "success",
            token: token
        });
    }
    res.json({
        status: "error",
        message: "Username or password invalid."
    });
});

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL3JvdXRlcy9hdXRoLnJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsInBvc3QiLCJyZXEiLCJyZXMiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJwYXlsb2FkIiwiaXNBdXRoZW50aWNhdGVkIiwiZXhwaXJhdGlvbiIsImV4cGlyZXNJbiIsInRva2VuIiwic2lnbiIsImp3dCIsInNlY3JldCIsImpzb24iLCJzdGF0dXMiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBR0E7Ozs7OztBQUZBLElBQU1BLFNBQVMsa0JBQVFDLE1BQVIsRUFBZjs7QUFJQUQsT0FBT0UsSUFBUCxDQUFZLEdBQVosRUFBaUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFBQSxvQkFDSUQsSUFBSUUsSUFEUjtBQUFBLFFBQ25CQyxRQURtQixhQUNuQkEsUUFEbUI7QUFBQSxRQUNUQyxRQURTLGFBQ1RBLFFBRFM7OztBQUczQixRQUNJLGlCQUFPQyxJQUFQLENBQVlGLFFBQVosS0FBeUJBLFFBQXpCLElBQ0EsaUJBQU9FLElBQVAsQ0FBWUQsUUFBWixLQUF5QkEsUUFGN0IsRUFHRTtBQUNFLFlBQU1FLFVBQVU7QUFDWkMsNkJBQWlCO0FBREwsU0FBaEI7QUFHQSxZQUFNQyxhQUFhLEVBQUVDLFdBQVcsS0FBYixFQUFuQixDQUpGLENBSTJDOztBQUV6QztBQUNBLFlBQU1DLFFBQVEsdUJBQUlDLElBQUosQ0FBU0wsT0FBVCxFQUFrQixpQkFBT00sR0FBUCxDQUFXQyxNQUE3QixFQUFxQ0wsVUFBckMsQ0FBZDtBQUNBUCxZQUFJYSxJQUFKLENBQVM7QUFDTEMsb0JBQVEsU0FESDtBQUVMTDtBQUZLLFNBQVQ7QUFJSDtBQUNEVCxRQUFJYSxJQUFKLENBQVM7QUFDTEMsZ0JBQVEsT0FESDtBQUVMQyxpQkFBUztBQUZKLEtBQVQ7QUFJSCxDQXZCRDs7QUF5QkFDLE9BQU9DLE9BQVAsR0FBaUJyQixNQUFqQiIsImZpbGUiOiJhdXRoLnJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuXG4gICAgaWYgKFxuICAgICAgICBDT05GSUcuYXV0aC51c2VybmFtZSA9PT0gdXNlcm5hbWUgJiZcbiAgICAgICAgQ09ORklHLmF1dGgucGFzc3dvcmQgPT09IHBhc3N3b3JkXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXhwaXJhdGlvbiA9IHsgZXhwaXJlc0luOiA4NjQwMCB9OyAvLyAyNCBob3VyIGV4cGlyYXRpb25cblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgdG9rZW5cbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihwYXlsb2FkLCBDT05GSUcuand0LnNlY3JldCwgZXhwaXJhdGlvbik7XG4gICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICB0b2tlblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzLmpzb24oe1xuICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbnZhbGlkLlwiXG4gICAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG4iXX0=