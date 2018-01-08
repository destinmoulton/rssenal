"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feedparserPromised = require("feedparser-promised");

var _feedparserPromised2 = _interopRequireDefault(_feedparserPromised);

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
            return this._updateFeed(req.query.feedId).then(function () {
                var query = {
                    feed_id: req.query.feedId
                };
                if (req.query.hasOwnProperty("hasRead")) {
                    query["has_read"] = req.query.hasRead;
                }
                return _Entries2.default.find(query).sort({ publish_date: "desc" });
            }).then(function (entries) {
                return res.json({
                    status: "success",
                    entries: entries
                });
            }).catch(function (err) {
                return res.json({
                    status: "error",
                    error: "Unable to update all feeds." + err.message
                });
            });
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
        key: "_updateFeed",
        value: function _updateFeed(feedId) {
            var _this = this;

            return _Feeds2.default.findOne({ _id: feedId }).then(function (feed) {
                return _feedparserPromised2.default.parse(feed.url);
            }).then(function (entries) {
                var entryPromises = [];
                entries.forEach(function (entry) {
                    entryPromises.push(_this._addNewEntry(feedId, entry));
                });
                // Add all the entries
                return Promise.all(entryPromises);
            });
        }
    }, {
        key: "_addNewEntry",
        value: function _addNewEntry(feedId, newEntry) {
            console.log("Entries.controller :: _addNewEntry :: pubDate = " + newEntry.pubDate);
            var query = {
                feed_id: feedId,
                guid: newEntry.guid
            };
            return _Entries2.default.findOne(query).then(function (foundEntry) {
                if (!foundEntry || !foundEntry._id) {
                    var data = {
                        feed_id: feedId,
                        guid: newEntry.guid,
                        title: newEntry.title,
                        link: newEntry.link,
                        creator: newEntry.author,
                        content: newEntry.description,
                        content_snippet: newEntry.summary,
                        publish_date: newEntry.pubDate
                    };
                    var insert = new _Entries2.default(data);
                    return insert.save();
                }
                return true;
            });
        }
    }]);

    return EntriesController;
}();

exports.default = new EntriesController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVGZWVkIiwicXVlcnkiLCJmZWVkSWQiLCJ0aGVuIiwiZmVlZF9pZCIsImhhc093blByb3BlcnR5IiwiaGFzUmVhZCIsImZpbmQiLCJzb3J0IiwicHVibGlzaF9kYXRlIiwianNvbiIsInN0YXR1cyIsImVudHJpZXMiLCJjYXRjaCIsImVycm9yIiwiZXJyIiwibWVzc2FnZSIsImZpbmRCeUlkIiwicGFyYW1zIiwiZW50cnlJZCIsImVudHJ5IiwiZGF0YSIsImJvZHkiLCJoYXNfcmVhZCIsInNhdmUiLCJuZXdFbnRyeSIsImZpbmRPbmUiLCJfaWQiLCJwYXJzZSIsImZlZWQiLCJ1cmwiLCJlbnRyeVByb21pc2VzIiwiZm9yRWFjaCIsInB1c2giLCJfYWRkTmV3RW50cnkiLCJQcm9taXNlIiwiYWxsIiwiY29uc29sZSIsImxvZyIsInB1YkRhdGUiLCJndWlkIiwiZm91bmRFbnRyeSIsInRpdGxlIiwibGluayIsImNyZWF0b3IiLCJhdXRob3IiLCJjb250ZW50IiwiZGVzY3JpcHRpb24iLCJjb250ZW50X3NuaXBwZXQiLCJzdW1tYXJ5IiwiaW5zZXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsaUI7Ozs7Ozs7NEJBQ0VDLEcsRUFBS0MsRyxFQUFLO0FBQ1YsbUJBQU8sS0FBS0MsV0FBTCxDQUFpQkYsSUFBSUcsS0FBSixDQUFVQyxNQUEzQixFQUNGQyxJQURFLENBQ0csWUFBTTtBQUNSLG9CQUFJRixRQUFRO0FBQ1JHLDZCQUFTTixJQUFJRyxLQUFKLENBQVVDO0FBRFgsaUJBQVo7QUFHQSxvQkFBSUosSUFBSUcsS0FBSixDQUFVSSxjQUFWLENBQXlCLFNBQXpCLENBQUosRUFBeUM7QUFDckNKLDBCQUFN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QixPQVBqQjtBQVFUeEMsc0NBQWNnQixTQUFTYztBQVJkLHFCQUFiO0FBVUEsd0JBQU1XLFNBQVMsc0JBQVk3QixJQUFaLENBQWY7QUFDQSwyQkFBTzZCLE9BQU8xQixJQUFQLEVBQVA7QUFDSDtBQUNELHVCQUFPLElBQVA7QUFDSCxhQWhCTSxDQUFQO0FBaUJIOzs7Ozs7a0JBR1UsSUFBSTNCLGlCQUFKLEUiLCJmaWxlIjoiRW50cmllcy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZlZWRwYXJzZXIgZnJvbSBcImZlZWRwYXJzZXItcHJvbWlzZWRcIjtcblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4uL21vZGVscy9FbnRyaWVzLm1vZGVsXCI7XG5pbXBvcnQgRmVlZHMgZnJvbSBcIi4uL21vZGVscy9GZWVkcy5tb2RlbFwiO1xuXG5jbGFzcyBFbnRyaWVzQ29udHJvbGxlciB7XG4gICAgZ2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVGZWVkKHJlcS5xdWVyeS5mZWVkSWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICBmZWVkX2lkOiByZXEucXVlcnkuZmVlZElkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAocmVxLnF1ZXJ5Lmhhc093blByb3BlcnR5KFwiaGFzUmVhZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeVtcImhhc19yZWFkXCJdID0gcmVxLnF1ZXJ5Lmhhc1JlYWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBFbnRyaWVzLmZpbmQocXVlcnkpLnNvcnQoeyBwdWJsaXNoX2RhdGU6IFwiZGVzY1wiIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGVudHJpZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHVwZGF0ZSBhbGwgZmVlZHMuXCIgKyBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEVudHJpZXMuZmluZEJ5SWQocmVxLnBhcmFtcy5lbnRyeUlkLCAoZXJyLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVbmFibGUgdG8gZmluZCB0aGUgZW50cnkgd2l0aCBpZDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnBhcmFtcy5lbnRyeUlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXEuYm9keTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImhhc19yZWFkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Lmhhc19yZWFkID0gZGF0YS5oYXNfcmVhZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW50cnkuc2F2ZSgoZXJyLCBuZXdFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHNhdmUgdGhlIHVwZGF0ZWQgZW50cnkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnk6IG5ld0VudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdXBkYXRlRmVlZChmZWVkSWQpIHtcbiAgICAgICAgcmV0dXJuIEZlZWRzLmZpbmRPbmUoeyBfaWQ6IGZlZWRJZCB9KVxuICAgICAgICAgICAgLnRoZW4oZmVlZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZlZWRwYXJzZXIucGFyc2UoZmVlZC51cmwpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGVudHJpZXMgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbnRyeVByb21pc2VzID0gW107XG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnlQcm9taXNlcy5wdXNoKHRoaXMuX2FkZE5ld0VudHJ5KGZlZWRJZCwgZW50cnkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYWxsIHRoZSBlbnRyaWVzXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGVudHJ5UHJvbWlzZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2FkZE5ld0VudHJ5KGZlZWRJZCwgbmV3RW50cnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBcIkVudHJpZXMuY29udHJvbGxlciA6OiBfYWRkTmV3RW50cnkgOjogcHViRGF0ZSA9IFwiICtcbiAgICAgICAgICAgICAgICBuZXdFbnRyeS5wdWJEYXRlXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgZmVlZF9pZDogZmVlZElkLFxuICAgICAgICAgICAgZ3VpZDogbmV3RW50cnkuZ3VpZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRW50cmllcy5maW5kT25lKHF1ZXJ5KS50aGVuKGZvdW5kRW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmb3VuZEVudHJ5IHx8ICFmb3VuZEVudHJ5Ll9pZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWRJZCxcbiAgICAgICAgICAgICAgICAgICAgZ3VpZDogbmV3RW50cnkuZ3VpZCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5ld0VudHJ5LnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBuZXdFbnRyeS5saW5rLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBuZXdFbnRyeS5hdXRob3IsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG5ld0VudHJ5LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50X3NuaXBwZXQ6IG5ld0VudHJ5LnN1bW1hcnksXG4gICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hfZGF0ZTogbmV3RW50cnkucHViRGF0ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0ID0gbmV3IEVudHJpZXMoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc2VydC5zYXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRW50cmllc0NvbnRyb2xsZXIoKTtcbiJdfQ==