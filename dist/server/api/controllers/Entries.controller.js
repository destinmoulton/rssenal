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
        key: "get",
        value: function get(req, res) {
            try {
                this._updateAllFeeds();
            } catch (e) {
                return res.json({
                    status: "error",
                    error: "Unable to update all feeds." + e.message
                });
            }

            var query = {};
            if (req.query.hasOwnProperty("hasRead")) {
                query["has_read"] = req.query.hasRead;
            }
            _Entries2.default.find(query, function (err, entries) {
                if (err) {
                    res.json({
                        status: "error",
                        error: "Unable to get all entries."
                    });
                } else {
                    res.json({
                        status: "success",
                        entries: entries
                    });
                }
            }).sort({ publish_date: 'desc' });
        }
    }, {
        key: "updateSingle",
        value: function updateSingle(req, res) {
            _Entries2.default.findById(req.params.entryId, function (err, entry) {
                if (err) {
                    res.json({
                        status: "error",
                        error: "Unable to find the entry with id: " + req.params.entryId
                    });
                } else {
                    var data = req.body;
                    if (data.hasOwnProperty("has_read")) {
                        entry.has_read = data.has_read;
                    }
                    entry.save(function (err, newEntry) {
                        if (err) {
                            res.json({
                                status: "error",
                                error: "Unable to save the updated entry."
                            });
                        } else {
                            res.json({
                                status: "success",
                                entry: newEntry
                            });
                        }
                    });
                }
            });
        }
    }, {
        key: "_updateAllFeeds",
        value: function _updateAllFeeds() {

            _Feeds2.default.find({}, function (err, feeds) {
                if (err) {
                    throw new Error(err);
                }

                feeds.forEach(function (feed) {
                    _rssParser2.default.parseURL(feed.url, function (err, parsedFeed) {
                        // TODO: Add err handler?

                        parsedFeed.feed.entries.forEach(function (entry) {
                            var query = {
                                feed_id: feed._id,
                                guid: entry.guid
                            };
                            _Entries2.default.find(query, function (err, possibleEntry) {
                                if (possibleEntry.length === 0) {
                                    var data = _extends({}, entry, {
                                        feed_id: feed._id,
                                        publish_date: entry.isoDate
                                    });
                                    var newEntry = new _Entries2.default(data);
                                    newEntry.save(function (err, entry) {
                                        // TODO: Add err handler?
                                    });
                                }
                            }).limit(1);
                        });
                    });
                });
            });
        }
    }]);

    return EntriesController;
}();

exports.default = new EntriesController();