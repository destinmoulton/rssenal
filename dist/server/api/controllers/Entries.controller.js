"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rssParser = require("rss-parser");

var _rssParser2 = _interopRequireDefault(_rssParser);

var _Entries = require("../models/Entries.model");

var _Entries2 = _interopRequireDefault(_Entries);

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntriesController = function () {
    function EntriesController() {
        _classCallCheck(this, EntriesController);
    }

    _createClass(EntriesController, [{
        key: "get_all",
        value: function get_all(req, res) {
            _Entries2.default.find({}, function (err, entries) {
                if (err) res.send(err);
                res.send({
                    status: "success",
                    entries: entries
                });
            }).sort({ publish_date: 'desc' });
        }
    }, {
        key: "update_all",
        value: function update_all(req, res) {

            _Feeds2.default.find({}, function (err, feeds) {
                if (err) {
                    return res.json({
                        status: "error",
                        error: "Feeds not found."
                    });
                }

                feeds.forEach(function (feed) {
                    _rssParser2.default.parseURL(feed.url, function (err, parsedFeed) {
                        if (err) {}

                        parsedFeed.feed.entries.forEach(function (entry) {
                            var query = {
                                feed_id: feed._id,
                                guid: entry.guid
                            };
                            _Entries2.default.find(query, function (err, possibleEntry) {
                                if (possibleEntry.length === 0) {
                                    var data = _extends({}, entry, {
                                        feed_id: feed._id
                                    });
                                    var newEntry = new _Entries2.default(data);
                                    newEntry.save(function (err, entry) {});
                                }
                            }).limit(1);
                        });
                    });
                });
                return res.json({
                    status: "success"
                });
            });
        }
    }]);

    return EntriesController;
}();

exports.default = new EntriesController();