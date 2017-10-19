'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FeedGroups = require('../models/FeedGroups.model');

var _FeedGroups2 = _interopRequireDefault(_FeedGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeedGroupsController = function () {
    function FeedGroupsController() {
        _classCallCheck(this, FeedGroupsController);
    }

    _createClass(FeedGroupsController, [{
        key: 'get_all',
        value: function get_all(req, res) {
            _FeedGroups2.default.find({}, function (err, groups) {
                if (err) res.send(err);
                res.send(groups);
            }).sort({ order: 'asc' });
        }
    }, {
        key: 'add',
        value: function add(req, res) {
            // Add a new feed group as the last in order
            _FeedGroups2.default.find({}, function (err, maxOrderedFeedGroup) {
                var data = req.body;

                var order = 0;
                if (maxOrderedFeedGroup.length > 0) {
                    order = maxOrderedFeedGroup[0].order + 1;
                }

                data['order'] = order;
                var newFeedGroup = new _FeedGroups2.default(data);
                newFeedGroup.save(function (err, group) {
                    if (err) res.send(err);
                    res.json(group);
                });
            }).sort({ order: 'desc' }).limit(1);
        }
    }, {
        key: 'get_single',
        value: function get_single(req, res) {
            _FeedGroups2.default.findById(req.params.feedGroupId, function (err, group) {
                if (err) res.send(err);
                res.json(group);
            });
        }
    }, {
        key: 'delete_single',
        value: function delete_single(req, res) {
            _FeedGroups2.default.remove({ _id: req.params.feedGroupId }, function (err) {
                if (err) res.send(err);
                res.json({ message: "Group deleted.", _id: req.params.feedGroupId, status: "success" });
            });
        }
    }, {
        key: 'update_single',
        value: function update_single(req, res) {
            _FeedGroups2.default.findById(req.params.feedGroupId, function (err, group) {
                if (err) res.send(err);
                group.name = req.body.name;
                group.save(function (err, updatedGroup) {
                    if (err) res.send(err);

                    res.json(updatedGroup);
                });
            });
        }
    }]);

    return FeedGroupsController;
}();

exports.default = new FeedGroupsController();