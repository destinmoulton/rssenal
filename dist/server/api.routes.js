"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    app.use('/api/feedgroups', _FeedGroups2.default);
    app.use('/api/feeds', _Feeds2.default);
    app.use('/api/validatefeedurl', _ValidateFeedURL2.default);
};

var _FeedGroups = require("./api/routes/FeedGroups.route");

var _FeedGroups2 = _interopRequireDefault(_FeedGroups);

var _Feeds = require("./api/routes/Feeds.route");

var _Feeds2 = _interopRequireDefault(_Feeds);

var _ValidateFeedURL = require("./api/routes/ValidateFeedURL.route");

var _ValidateFeedURL2 = _interopRequireDefault(_ValidateFeedURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }