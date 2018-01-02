"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

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

// Setup the jwt middleware
app.use((0, _expressJwt2.default)({ secret: _config2.default.jwt.secret }));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvc2VydmVyLmpzIl0sIm5hbWVzIjpbIlBVQkxJQ19QQVRIIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImFwcCIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwibW9uZ28iLCJ1cmkiLCJ1c2VNb25nb0NsaWVudCIsInByb21pc2VMaWJyYXJ5IiwidXNlIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsInNlY3JldCIsImp3dCIsInN0YXRpYyIsInJlcXVpcmUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kRmlsZSIsImpvaW4iLCJsaXN0ZW4iLCJwb3J0IiwiY29uc29sZSIsImxvZyIsInJlcGVhdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLElBQU1BLGNBQWMsZUFBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLFdBQXhCLENBQXBCOztBQUVBLElBQU1DLE1BQU0sd0JBQVo7O0FBRUE7QUFDQSxtQkFBU0MsT0FBVCxHQUFtQkMsT0FBT0QsT0FBMUI7QUFDQSxtQkFBU0UsT0FBVCxDQUFpQixpQkFBT0MsS0FBUCxDQUFhQyxHQUE5QixFQUFtQztBQUMvQkMsb0JBQWdCLElBRGU7QUFFL0JDLG9CQUFnQkwsT0FBT0Q7QUFGUSxDQUFuQzs7QUFLQTtBQUNBRCxJQUFJUSxHQUFKLENBQVEscUJBQVdDLFVBQVgsQ0FBc0IsRUFBRUMsVUFBVSxJQUFaLEVBQXRCLENBQVI7QUFDQVYsSUFBSVEsR0FBSixDQUFRLHFCQUFXRyxJQUFYLEVBQVI7O0FBRUE7QUFDQVgsSUFBSVEsR0FBSixDQUFRLDBCQUFJLEVBQUVJLFFBQVEsaUJBQU9DLEdBQVAsQ0FBV0QsTUFBckIsRUFBSixDQUFSOztBQUVBWixJQUFJUSxHQUFKLENBQVEsa0JBQVFNLE1BQVIsQ0FBZWpCLFdBQWYsQ0FBUjs7QUFFQTtBQUNBRyxJQUFJUSxHQUFKLENBQVEsR0FBUixFQUFhTyxRQUFRLFVBQVIsQ0FBYjs7QUFFQTtBQUNBZixJQUFJZ0IsR0FBSixDQUFRLEdBQVIsRUFBYSxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUN2QkEsUUFBSUMsUUFBSixDQUFhLGVBQUtDLElBQUwsQ0FBVXZCLFdBQVYsRUFBdUIsYUFBdkIsQ0FBYjtBQUNILENBRkQ7O0FBSUFHLElBQUlxQixNQUFKLENBQVcsaUJBQU9DLElBQWxCOztBQUVBO0FBQ0FDLFFBQVFDLEdBQVIsQ0FBWSxJQUFJQyxNQUFKLENBQVcsRUFBWCxDQUFaO0FBQ0FGLFFBQVFDLEdBQVIsQ0FBWSxzREFBc0QsaUJBQU9GLElBQXpFO0FBQ0FDLFFBQVFDLEdBQVIsQ0FBWSxJQUFJQyxNQUFKLENBQVcsRUFBWCxDQUFaIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBqd3QgZnJvbSBcImV4cHJlc3Mtand0XCI7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgQ09ORklHIGZyb20gXCIuL2NvbmZpZy9jb25maWdcIjtcblxuY29uc3QgUFVCTElDX1BBVEggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL3B1YmxpY1wiKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4vLyBDb25uZWN0IG1vbmdvb3NlXG5tb25nb29zZS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5tb25nb29zZS5jb25uZWN0KENPTkZJRy5tb25nby51cmksIHtcbiAgICB1c2VNb25nb0NsaWVudDogdHJ1ZSxcbiAgICBwcm9taXNlTGlicmFyeTogZ2xvYmFsLlByb21pc2Vcbn0pO1xuXG4vLyBTZXR1cCBib2R5LXBhcnNlclxuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuLy8gU2V0dXAgdGhlIGp3dCBtaWRkbGV3YXJlXG5hcHAudXNlKGp3dCh7IHNlY3JldDogQ09ORklHLmp3dC5zZWNyZXQgfSkpO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKFBVQkxJQ19QQVRIKSk7XG5cbi8vIFNldHVwIHRoZSByb3V0ZXNcbmFwcC51c2UoXCIvXCIsIHJlcXVpcmUoXCIuL3JvdXRlc1wiKSk7XG5cbi8vIEFsbG93IGFsbCBVUkknczsgaGFuZGxlIGJ5IHJlYWN0IHJvdXRlclxuYXBwLmdldChcIipcIiwgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihQVUJMSUNfUEFUSCwgXCIvaW5kZXguaHRtbFwiKSk7XG59KTtcblxuYXBwLmxpc3RlbihDT05GSUcucG9ydCk7XG5cbi8vIE91dHB1dCB0aGUgc2VydmVyIGxpc3RlbmluZyBtZXNzYWdlXG5jb25zb2xlLmxvZyhcIi1cIi5yZXBlYXQoNTApKTtcbmNvbnNvbGUubG9nKFwiLS0tIHJzc2VuYWwgc2VydmVyIGxpc3RlbmluZyBvbiBodHRwOi8vMTI3LjAuMC4xOlwiICsgQ09ORklHLnBvcnQpO1xuY29uc29sZS5sb2coXCItXCIucmVwZWF0KDUwKSk7XG4iXX0=