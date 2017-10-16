"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entries = require("../models/Entries.model");

var _Entries2 = _interopRequireDefault(_Entries);

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeedsController = function () {
    function FeedsController() {
        _classCallCheck(this, FeedsController);
    }

    _createClass(FeedsController, [{
        key: "get_all",
        value: function get_all(req, res) {
            _Feeds2.default.find({}, function (err, feeds) {
                if (err) {
                    res.json({
                        status: "error",
                        error: err
                    });
                } else {
                    res.json({ status: "success", feeds: feeds });
                }
            }).sort({ title: 'asc' });
        }
    }, {
        key: "add",
        value: function add(req, res) {
            var newFeed = new _Feeds2.default(req.body);
            newFeed.save(function (err, feed) {
                if (err) {
                    res.json({
                        status: "error",
                        error: err
                    });
                } else {
                    var data = {
                        status: "success",
                        feedInfo: feed
                    };
                    res.json(data);
                }
            });
        }
    }, {
        key: "get_single",
        value: function get_single(req, res) {
            _Feeds2.default.findById(req.params.feedId, function (err, feed) {
                if (err) res.send(err);
                res.json(feed);
            });
        }
    }, {
        key: "delete_single",
        value: function delete_single(req, res) {
            _Entries2.default.remove({ feed_id: req.params.feedId }, function (err) {
                // TODO: Add err handler?

                _Feeds2.default.remove({ _id: req.params.feedId }, function (err) {
                    if (err) {
                        return res.send({ status: "error" });
                    }
                    res.json({ status: "success" });
                });
            });
        }
    }, {
        key: "update_single",
        value: function update_single(req, res) {
            _Entries2.default.findById(req.params.feedId, function (err, feed) {
                if (err) {
                    res.json({
                        status: "error",
                        error: "Unable to find that feed to update."
                    });
                } else {
                    var newFeed = req.body;
                    feed.title = newFeed.title;
                    feed.feedgroup_id = newFeed.feedgroup_id;
                    feed.save(function (err, feedInfo) {
                        if (err) {
                            res.json({
                                status: "error",
                                error: "Unable to save the new feed information."
                            });
                        } else {
                            var data = {
                                status: "success",
                                feedInfo: feedInfo
                            };
                            res.json(data);
                        }
                    });
                }
            });
        }
    }]);

    return FeedsController;
}();

exports.default = new FeedsController();