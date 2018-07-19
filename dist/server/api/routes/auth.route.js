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

const router = _express2.default.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (_config2.default.auth.username === username && _config2.default.auth.password === password) {
        const payload = {
            isAuthenticated: true
        };
        const expiration = { expiresIn: 86400 }; // 24 hour expiration

        // Generate the token
        const token = _jsonwebtoken2.default.sign(payload, _config2.default.jwt.secret, expiration);
        res.json({
            status: "success",
            token
        });
    }
    res.json({
        status: "error",
        message: "Username or password invalid."
    });
});

router.get("/validatetoken", _requireJWT2.default, (req, res) => {
    res.json({
        status: "valid"
    });
});

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL3JvdXRlcy9hdXRoLnJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsInBvc3QiLCJyZXEiLCJyZXMiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiYm9keSIsImF1dGgiLCJwYXlsb2FkIiwiaXNBdXRoZW50aWNhdGVkIiwiZXhwaXJhdGlvbiIsImV4cGlyZXNJbiIsInRva2VuIiwic2lnbiIsImp3dCIsInNlY3JldCIsImpzb24iLCJzdGF0dXMiLCJtZXNzYWdlIiwiZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBSEEsTUFBTUEsU0FBUyxrQkFBUUMsTUFBUixFQUFmOztBQUtBRCxPQUFPRSxJQUFQLENBQVksUUFBWixFQUFzQixDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUNoQyxVQUFNLEVBQUVDLFFBQUYsRUFBWUMsUUFBWixLQUF5QkgsSUFBSUksSUFBbkM7O0FBRUEsUUFDSSxpQkFBT0MsSUFBUCxDQUFZSCxRQUFaLEtBQXlCQSxRQUF6QixJQUNBLGlCQUFPRyxJQUFQLENBQVlGLFFBQVosS0FBeUJBLFFBRjdCLEVBR0U7QUFDRSxjQUFNRyxVQUFVO0FBQ1pDLDZCQUFpQjtBQURMLFNBQWhCO0FBR0EsY0FBTUMsYUFBYSxFQUFFQyxXQUFXLEtBQWIsRUFBbkIsQ0FKRixDQUkyQzs7QUFFekM7QUFDQSxjQUFNQyxRQUFRLHVCQUFJQyxJQUFKLENBQVNMLE9BQVQsRUFBa0IsaUJBQU9NLEdBQVAsQ0FBV0MsTUFBN0IsRUFBcUNMLFVBQXJDLENBQWQ7QUFDQVAsWUFBSWEsSUFBSixDQUFTO0FBQ0xDLG9CQUFRLFNBREg7QUFFTEw7QUFGSyxTQUFUO0FBSUg7QUFDRFQsUUFBSWEsSUFBSixDQUFTO0FBQ0xDLGdCQUFRLE9BREg7QUFFTEMsaUJBQVM7QUFGSixLQUFUO0FBSUgsQ0F2QkQ7O0FBeUJBbkIsT0FBT29CLEdBQVAsQ0FBVyxnQkFBWCx3QkFBeUMsQ0FBQ2pCLEdBQUQsRUFBTUMsR0FBTixLQUFjO0FBQ25EQSxRQUFJYSxJQUFKLENBQVM7QUFDTEMsZ0JBQVE7QUFESCxLQUFUO0FBR0gsQ0FKRDs7QUFNQUcsT0FBT0MsT0FBUCxHQUFpQnRCLE1BQWpCIiwiZmlsZSI6ImF1dGgucm91dGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XG5pbXBvcnQgcmVxdWlyZUpXVCBmcm9tIFwiLi4vLi4vbGliL3JlcXVpcmVKV1RcIjtcblxucm91dGVyLnBvc3QoXCIvbG9naW5cIiwgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuXG4gICAgaWYgKFxuICAgICAgICBDT05GSUcuYXV0aC51c2VybmFtZSA9PT0gdXNlcm5hbWUgJiZcbiAgICAgICAgQ09ORklHLmF1dGgucGFzc3dvcmQgPT09IHBhc3N3b3JkXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXhwaXJhdGlvbiA9IHsgZXhwaXJlc0luOiA4NjQwMCB9OyAvLyAyNCBob3VyIGV4cGlyYXRpb25cblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgdG9rZW5cbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihwYXlsb2FkLCBDT05GSUcuand0LnNlY3JldCwgZXhwaXJhdGlvbik7XG4gICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICB0b2tlblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzLmpzb24oe1xuICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgbWVzc2FnZTogXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbnZhbGlkLlwiXG4gICAgfSk7XG59KTtcblxucm91dGVyLmdldChcIi92YWxpZGF0ZXRva2VuXCIsIHJlcXVpcmVKV1QsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5qc29uKHtcbiAgICAgICAgc3RhdHVzOiBcInZhbGlkXCJcbiAgICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcbiJdfQ==