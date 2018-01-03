"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("../../config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/", function (req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;


    if (_config2.default.auth.username === username && _config2.default.auth.password === password) {
        res.json({
            status: "success"
        });
    }
    res.json({
        status: "error",
        message: "Username or password invalid."
    });
});

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL3JvdXRlcy9hdXRoLnJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsInBvc3QiLCJyZXEiLCJyZXMiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJqc29uIiwic3RhdHVzIiwibWVzc2FnZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFHQTs7Ozs7O0FBRkEsSUFBTUEsU0FBUyxrQkFBUUMsTUFBUixFQUFmOztBQUlBRCxPQUFPRSxJQUFQLENBQVksR0FBWixFQUFpQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUFBLG9CQUNJRCxJQUFJRSxJQURSO0FBQUEsUUFDbkJDLFFBRG1CLGFBQ25CQSxRQURtQjtBQUFBLFFBQ1RDLFFBRFMsYUFDVEEsUUFEUzs7O0FBRzNCLFFBQ0ksaUJBQU9DLElBQVAsQ0FBWUYsUUFBWixLQUF5QkEsUUFBekIsSUFDQSxpQkFBT0UsSUFBUCxDQUFZRCxRQUFaLEtBQXlCQSxRQUY3QixFQUdFO0FBQ0VILFlBQUlLLElBQUosQ0FBUztBQUNMQyxvQkFBUTtBQURILFNBQVQ7QUFHSDtBQUNETixRQUFJSyxJQUFKLENBQVM7QUFDTEMsZ0JBQVEsT0FESDtBQUVMQyxpQkFBUztBQUZKLEtBQVQ7QUFJSCxDQWZEOztBQWlCQUMsT0FBT0MsT0FBUCxHQUFpQmIsTUFBakIiLCJmaWxlIjoiYXV0aC5yb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XG5cbnJvdXRlci5wb3N0KFwiL1wiLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG5cbiAgICBpZiAoXG4gICAgICAgIENPTkZJRy5hdXRoLnVzZXJuYW1lID09PSB1c2VybmFtZSAmJlxuICAgICAgICBDT05GSUcuYXV0aC5wYXNzd29yZCA9PT0gcGFzc3dvcmRcbiAgICApIHtcbiAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzLmpzb24oe1xuICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbnZhbGlkLlwiXG4gICAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG4iXX0=