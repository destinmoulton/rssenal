"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                if (err) res.send(err);
                res.send(feeds);
            });
        }
    }, {
        key: "add",
        value: function add(req, res) {
            var newFeed = new _Feeds2.default(req.body);
            newFeed.save(function (err, feed) {
                if (err) res.send(err);
                res.json(feed);
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
            _Feeds2.default.remove({ _id: req.params.feedId }, function (err) {
                if (err) res.send(err);
                res.json({ message: "Feed deleted." });
            });
        }
    }]);

    return FeedsController;
}();

exports.default = new FeedsController();