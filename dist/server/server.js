"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _config = require("./config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PUBLIC_PATH = _path2.default.resolve(__dirname, "../public");

var app = (0, _express2.default)();

// Connect mongoose
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.mongo.uri, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

// Setup body-parser
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static(PUBLIC_PATH));

// Setup the routes
app.use("/", require("./routes"));

// Allow all URI's; handle by react router
app.get("*", function (req, res) {
    res.sendFile(_path2.default.join(PUBLIC_PATH, "/index.html"));
});

app.listen(_config2.default.port);

// Output the server listening message
console.log("-".repeat(50));
console.log("--- rssenal server listening on http://127.0.0.1:" + _config2.default.port);
console.log("-".repeat(50));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvc2VydmVyLmpzIl0sIm5hbWVzIjpbIlBVQkxJQ19QQVRIIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImFwcCIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwibW9uZ28iLCJ1cmkiLCJ1c2VNb25nb0NsaWVudCIsInByb21pc2VMaWJyYXJ5IiwidXNlIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsInN0YXRpYyIsInJlcXVpcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kRmlsZSIsImpvaW4iLCJsaXN0ZW4iLCJwb3J0IiwiY29uc29sZSIsImxvZyIsInJlcGVhdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjLGVBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixXQUF4QixDQUFwQjs7QUFFQSxJQUFNQyxNQUFNLHdCQUFaOztBQUVBO0FBQ0EsbUJBQVNDLE9BQVQsR0FBbUJDLE9BQU9ELE9BQTFCO0FBQ0EsbUJBQVNFLE9BQVQsQ0FBaUIsaUJBQU9DLEtBQVAsQ0FBYUMsR0FBOUIsRUFBbUM7QUFDL0JDLG9CQUFnQixJQURlO0FBRS9CQyxvQkFBZ0JMLE9BQU9EO0FBRlEsQ0FBbkM7O0FBS0E7QUFDQUQsSUFBSVEsR0FBSixDQUFRLHFCQUFXQyxVQUFYLENBQXNCLEVBQUVDLFVBQVUsSUFBWixFQUF0QixDQUFSO0FBQ0FWLElBQUlRLEdBQUosQ0FBUSxxQkFBV0csSUFBWCxFQUFSOztBQUVBWCxJQUFJUSxHQUFKLENBQVEsa0JBQVFJLE1BQVIsQ0FBZWYsV0FBZixDQUFSOztBQUVBO0FBQ0FHLElBQUlRLEdBQUosQ0FBUSxHQUFSLEVBQWFLLFFBQVEsVUFBUixDQUFiOztBQUVBO0FBQ0FiLElBQUljLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDdkJBLFFBQUlDLFFBQUosQ0FBYSxlQUFLQyxJQUFMLENBQVVyQixXQUFWLEVBQXVCLGFBQXZCLENBQWI7QUFDSCxDQUZEOztBQUlBRyxJQUFJbUIsTUFBSixDQUFXLGlCQUFPQyxJQUFsQjs7QUFFQTtBQUNBQyxRQUFRQyxHQUFSLENBQVksSUFBSUMsTUFBSixDQUFXLEVBQVgsQ0FBWjtBQUNBRixRQUFRQyxHQUFSLENBQVksc0RBQXNELGlCQUFPRixJQUF6RTtBQUNBQyxRQUFRQyxHQUFSLENBQVksSUFBSUMsTUFBSixDQUFXLEVBQVgsQ0FBWiIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZy9jb25maWdcIjtcblxuY29uc3QgUFVCTElDX1BBVEggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL3B1YmxpY1wiKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4vLyBDb25uZWN0IG1vbmdvb3NlXG5tb25nb29zZS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5tb25nb29zZS5jb25uZWN0KENPTkZJRy5tb25nby51cmksIHtcbiAgICB1c2VNb25nb0NsaWVudDogdHJ1ZSxcbiAgICBwcm9taXNlTGlicmFyeTogZ2xvYmFsLlByb21pc2Vcbn0pO1xuXG4vLyBTZXR1cCBib2R5LXBhcnNlclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhQVUJMSUNfUEFUSCkpO1xuXG4vLyBTZXR1cCB0aGUgcm91dGVzXG5hcHAudXNlKFwiL1wiLCByZXF1aXJlKFwiLi9yb3V0ZXNcIikpO1xuXG4vLyBBbGxvdyBhbGwgVVJJJ3M7IGhhbmRsZSBieSByZWFjdCByb3V0ZXJcbmFwcC5nZXQoXCIqXCIsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oUFVCTElDX1BBVEgsIFwiL2luZGV4Lmh0bWxcIikpO1xufSk7XG5cbmFwcC5saXN0ZW4oQ09ORklHLnBvcnQpO1xuXG4vLyBPdXRwdXQgdGhlIHNlcnZlciBsaXN0ZW5pbmcgbWVzc2FnZVxuY29uc29sZS5sb2coXCItXCIucmVwZWF0KDUwKSk7XG5jb25zb2xlLmxvZyhcIi0tLSByc3NlbmFsIHNlcnZlciBsaXN0ZW5pbmcgb24gaHR0cDovLzEyNy4wLjAuMTpcIiArIENPTkZJRy5wb3J0KTtcbmNvbnNvbGUubG9nKFwiLVwiLnJlcGVhdCg1MCkpO1xuIl19