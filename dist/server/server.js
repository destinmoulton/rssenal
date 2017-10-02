"use strict";

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _api = require("./api.routes");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3000;
var PUBLIC_PATH = _path2.default.resolve(__dirname, '../public');

var app = (0, _express2.default)();

// Connect mongoose
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect("mongodb://localhost/rssenal", { useMongoClient: true, promiseLibrary: global.Promise });

// Setup body-parser
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static(PUBLIC_PATH));

// Setup the api routes
(0, _api2.default)(app);

// Allow all URI's; handle by react router
app.get('*', function (req, res) {
    res.sendFile(_path2.default.join(PUBLIC_PATH, '/index.html'));
});

app.listen(PORT);

// Output the server listening message 
console.log("-".repeat(50));
console.log("--- rssenal server listening on http://127.0.0.1:" + PORT);
console.log("-".repeat(50));