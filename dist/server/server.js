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

const PUBLIC_PATH = _path2.default.resolve(__dirname, "../public");

const app = (0, _express2.default)();

// Connect mongoose
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.mongo.uri, {
    useNewUrlParser: true,
    promiseLibrary: global.Promise
});

// Setup body-parser
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static(PUBLIC_PATH));

// Setup the routes
app.use("/", require("./routes"));

// Allow all URI's; handle by react router
app.get("*", (req, res) => {
    res.sendFile(_path2.default.join(PUBLIC_PATH, "/index.html"));
});

app.listen(_config2.default.port);

const date = new Date();
// Output the server listening message
console.log("-".repeat(50));
console.log(`--- rssenal server listening on http://127.0.0.1:${_config2.default.port}`);
console.log(`--- ${date.toString()}`);
console.log("-".repeat(50));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvc2VydmVyLmpzIl0sIm5hbWVzIjpbIlBVQkxJQ19QQVRIIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImFwcCIsIlByb21pc2UiLCJnbG9iYWwiLCJjb25uZWN0IiwibW9uZ28iLCJ1cmkiLCJ1c2VOZXdVcmxQYXJzZXIiLCJwcm9taXNlTGlicmFyeSIsInVzZSIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJzdGF0aWMiLCJyZXF1aXJlIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZEZpbGUiLCJqb2luIiwibGlzdGVuIiwicG9ydCIsImRhdGUiLCJEYXRlIiwiY29uc29sZSIsImxvZyIsInJlcGVhdCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLE1BQU1BLGNBQWMsZUFBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLFdBQXhCLENBQXBCOztBQUVBLE1BQU1DLE1BQU0sd0JBQVo7O0FBRUE7QUFDQSxtQkFBU0MsT0FBVCxHQUFtQkMsT0FBT0QsT0FBMUI7QUFDQSxtQkFBU0UsT0FBVCxDQUNJLGlCQUFPQyxLQUFQLENBQWFDLEdBRGpCLEVBRUk7QUFDSUMscUJBQWlCLElBRHJCO0FBRUlDLG9CQUFnQkwsT0FBT0Q7QUFGM0IsQ0FGSjs7QUFRQTtBQUNBRCxJQUFJUSxHQUFKLENBQVEscUJBQVdDLFVBQVgsQ0FBc0IsRUFBRUMsVUFBVSxJQUFaLEVBQXRCLENBQVI7QUFDQVYsSUFBSVEsR0FBSixDQUFRLHFCQUFXRyxJQUFYLEVBQVI7O0FBRUFYLElBQUlRLEdBQUosQ0FBUSxrQkFBUUksTUFBUixDQUFlZixXQUFmLENBQVI7O0FBRUE7QUFDQUcsSUFBSVEsR0FBSixDQUFRLEdBQVIsRUFBYUssUUFBUSxVQUFSLENBQWI7O0FBRUE7QUFDQWIsSUFBSWMsR0FBSixDQUFRLEdBQVIsRUFBYSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUN2QkEsUUFBSUMsUUFBSixDQUFhLGVBQUtDLElBQUwsQ0FBVXJCLFdBQVYsRUFBdUIsYUFBdkIsQ0FBYjtBQUNILENBRkQ7O0FBSUFHLElBQUltQixNQUFKLENBQVcsaUJBQU9DLElBQWxCOztBQUVBLE1BQU1DLE9BQU8sSUFBSUMsSUFBSixFQUFiO0FBQ0E7QUFDQUMsUUFBUUMsR0FBUixDQUFZLElBQUlDLE1BQUosQ0FBVyxFQUFYLENBQVo7QUFDQUYsUUFBUUMsR0FBUixDQUFhLG9EQUFtRCxpQkFBT0osSUFBSyxFQUE1RTtBQUNBRyxRQUFRQyxHQUFSLENBQWEsT0FBTUgsS0FBS0ssUUFBTCxFQUFnQixFQUFuQztBQUNBSCxRQUFRQyxHQUFSLENBQVksSUFBSUMsTUFBSixDQUFXLEVBQVgsQ0FBWiIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5cbmltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCBDT05GSUcgZnJvbSBcIi4vY29uZmlnL2NvbmZpZ1wiO1xuXG5jb25zdCBQVUJMSUNfUEFUSCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vcHVibGljXCIpO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbi8vIENvbm5lY3QgbW9uZ29vc2Vcbm1vbmdvb3NlLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlLmNvbm5lY3QoXG4gICAgQ09ORklHLm1vbmdvLnVyaSxcbiAgICB7XG4gICAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICAgICAgcHJvbWlzZUxpYnJhcnk6IGdsb2JhbC5Qcm9taXNlXG4gICAgfVxuKTtcblxuLy8gU2V0dXAgYm9keS1wYXJzZXJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoUFVCTElDX1BBVEgpKTtcblxuLy8gU2V0dXAgdGhlIHJvdXRlc1xuYXBwLnVzZShcIi9cIiwgcmVxdWlyZShcIi4vcm91dGVzXCIpKTtcblxuLy8gQWxsb3cgYWxsIFVSSSdzOyBoYW5kbGUgYnkgcmVhY3Qgcm91dGVyXG5hcHAuZ2V0KFwiKlwiLCAocmVxLCByZXMpID0+IHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKFBVQkxJQ19QQVRILCBcIi9pbmRleC5odG1sXCIpKTtcbn0pO1xuXG5hcHAubGlzdGVuKENPTkZJRy5wb3J0KTtcblxuY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4vLyBPdXRwdXQgdGhlIHNlcnZlciBsaXN0ZW5pbmcgbWVzc2FnZVxuY29uc29sZS5sb2coXCItXCIucmVwZWF0KDUwKSk7XG5jb25zb2xlLmxvZyhgLS0tIHJzc2VuYWwgc2VydmVyIGxpc3RlbmluZyBvbiBodHRwOi8vMTI3LjAuMC4xOiR7Q09ORklHLnBvcnR9YCk7XG5jb25zb2xlLmxvZyhgLS0tICR7ZGF0ZS50b1N0cmluZygpfWApO1xuY29uc29sZS5sb2coXCItXCIucmVwZWF0KDUwKSk7XG4iXX0=