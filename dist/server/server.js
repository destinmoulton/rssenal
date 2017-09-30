"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _api = require("./api.routes");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;

var app = (0, _express2.default)();

// Connect mongoose
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect("mongodb://localhost/rssenal", { useMongoClient: true, promiseLibrary: global.Promise });

// Setup body-parser
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// Setup the api routes
(0, _api2.default)(app);

app.listen(port);

// Output the server listening message 
console.log("-".repeat(50));
console.log("--- rssenal server listening on http://127.0.0.1:" + port);
console.log("-".repeat(50));