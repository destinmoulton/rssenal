"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.use('/api/entries', _Entries2.default);
    app.use('/api/folders', _Folders2.default);
    app.use('/api/feeds', _Feeds2.default);
    app.use('/api/validatefeedurl', _ValidateFeedURL2.default);
};

var _Entries = require("./api/routes/Entries.route");

var _Entries2 = _interopRequireDefault(_Entries);

var _Folders = require("./api/routes/Folders.route");

var _Folders2 = _interopRequireDefault(_Folders);

var _Feeds = require("./api/routes/Feeds.route");

var _Feeds2 = _interopRequireDefault(_Feeds);

var _ValidateFeedURL = require("./api/routes/ValidateFeedURL.route");

var _ValidateFeedURL2 = _interopRequireDefault(_ValidateFeedURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }