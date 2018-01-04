"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../../config/config");

var _config2 = _interopRequireDefault(_config);

var _requireJWT = require("../../lib/requireJWT");

var _requireJWT2 = _interopRequireDefault(_requireJWT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/login", function (req, res) {
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

router.get("/validatetoken", _requireJWT2.default, function (req, res) {
    res.json({
        status: "valid"
    });
});

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL3JvdXRlcy9hdXRoLnJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsInBvc3QiLCJyZXEiLCJyZXMiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJwYXlsb2FkIiwiaXNBdXRoZW50aWNhdGVkIiwiZXhwaXJhdGlvbiIsImV4cGlyZXNJbiIsInRva2VuIiwic2lnbiIsImp3dCIsInNlY3JldCIsImpzb24iLCJzdGF0dXMiLCJtZXNzYWdlIiwiZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBSEEsSUFBTUEsU0FBUyxrQkFBUUMsTUFBUixFQUFmOztBQUtBRCxPQUFPRSxJQUFQLENBQVksUUFBWixFQUFzQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUFBLG9CQUNERCxJQUFJRSxJQURIO0FBQUEsUUFDeEJDLFFBRHdCLGFBQ3hCQSxRQUR3QjtBQUFBLFFBQ2RDLFFBRGMsYUFDZEEsUUFEYzs7O0FBR2hDLFFBQ0ksaUJBQU9DLElBQVAsQ0FBWUYsUUFBWixLQUF5QkEsUUFBekIsSUFDQSxpQkFBT0UsSUFBUCxDQUFZRCxRQUFaLEtBQXlCQSxRQUY3QixFQUdFO0FBQ0UsWUFBTUUsVUFBVTtBQUNaQyw2QkFBaUI7QUFETCxTQUFoQjtBQUdBLFlBQU1DLGFBQWEsRUFBRUMsV0FBVyxLQUFiLEVBQW5CLENBSkYsQ0FJMkM7O0FBRXpDO0FBQ0EsWUFBTUMsUUFBUSx1QkFBSUMsSUFBSixDQUFTTCxPQUFULEVBQWtCLGlCQUFPTSxHQUFQLENBQVdDLE1BQTdCLEVBQXFDTCxVQUFyQyxDQUFkO0FBQ0FQLFlBQUlhLElBQUosQ0FBUztBQUNMQyxvQkFBUSxTQURIO0FBRUxMO0FBRkssU0FBVDtBQUlIO0FBQ0RULFFBQUlhLElBQUosQ0FBUztBQUNMQyxnQkFBUSxPQURIO0FBRUxDLGlCQUFTO0FBRkosS0FBVDtBQUlILENBdkJEOztBQXlCQW5CLE9BQU9vQixHQUFQLENBQVcsZ0JBQVgsd0JBQXlDLFVBQUNqQixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNuREEsUUFBSWEsSUFBSixDQUFTO0FBQ0xDLGdCQUFRO0FBREgsS0FBVDtBQUdILENBSkQ7O0FBTUFHLE9BQU9DLE9BQVAsR0FBaUJ0QixNQUFqQiIsImZpbGUiOiJhdXRoLnJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuaW1wb3J0IENPTkZJRyBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IHJlcXVpcmVKV1QgZnJvbSBcIi4uLy4uL2xpYi9yZXF1aXJlSldUXCI7XG5cbnJvdXRlci5wb3N0KFwiL2xvZ2luXCIsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcblxuICAgIGlmIChcbiAgICAgICAgQ09ORklHLmF1dGgudXNlcm5hbWUgPT09IHVzZXJuYW1lICYmXG4gICAgICAgIENPTkZJRy5hdXRoLnBhc3N3b3JkID09PSBwYXNzd29yZFxuICAgICkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGV4cGlyYXRpb24gPSB7IGV4cGlyZXNJbjogODY0MDAgfTsgLy8gMjQgaG91ciBleHBpcmF0aW9uXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHRva2VuXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24ocGF5bG9hZCwgQ09ORklHLmp3dC5zZWNyZXQsIGV4cGlyYXRpb24pO1xuICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgdG9rZW5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlcy5qc29uKHtcbiAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiVXNlcm5hbWUgb3IgcGFzc3dvcmQgaW52YWxpZC5cIlxuICAgIH0pO1xufSk7XG5cbnJvdXRlci5nZXQoXCIvdmFsaWRhdGV0b2tlblwiLCByZXF1aXJlSldULCAocmVxLCByZXMpID0+IHtcbiAgICByZXMuanNvbih7XG4gICAgICAgIHN0YXR1czogXCJ2YWxpZFwiXG4gICAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG4iXX0=