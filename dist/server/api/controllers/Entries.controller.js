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
                // if (req.query.hasOwnProperty("hasRead")) {
                //     query["has_read"] = req.query.hasRead;
                // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVGZWVkIiwicXVlcnkiLCJmZWVkSWQiLCJ0aGVuIiwiZmVlZF9pZCIsImZpbmQiLCJzb3J0IiwicHVibGlzaF9kYXRlIiwianNvbiIsInN0YXR1cyIsImVudHJpZXMiLCJjYXRjaCIsImVycm9yIiwiZXJyIiwibWVzc2FnZSIsImZpbmRCeUlkIiwicGFyYW1zIiwiZW50cnlJZCIsImVudHJ5IiwiZGF0YSIsImJvZHkiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc19yZWFkIiwic2F2ZSIsIm5ld0VudHJ5IiwiZmluZE9uZSIsIl9pZCIsInBhcnNlIiwiZmVlZCIsInVybCIsImVudHJ5UHJvbWlzZXMiLCJmb3JFYWNoIiwicHVzaCIsIl9hZGROZXdFbnRyeSIsIlByb21pc2UiLCJhbGwiLCJndWlkIiwiZm91bmRFbnRyeSIsInRpdGxlIiwibGluayIsImNyZWF0b3IiLCJhdXRob3IiLCJjb250ZW50IiwiZGVzY3JpcHRpb24iLCJjb250ZW50X3NuaXBwZXQiLCJzdW1tYXJ5IiwicHViRGF0ZSIsImluc2VydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLGlCOzs7Ozs7OzRCQUNFQyxHLEVBQUtDLEcsRUFBSztBQUNWLG1CQUFPLEtBQUtDLFdBQUwsQ0FBaUJGLElBQUlHLEtBQUosQ0FBVUMsTUFBM0IsRUFDRkMsSUFERSxDQUNHLFlBQU07QUFDUixvQkFBSUYsUUFBUTtBQUNSRyw2QkFBU04sSUFBSUcsS0FBSixDQUFVQztBQURYLGlCQUFaO0FBR0E7QUFDQTtBQUNBO0FBQ0EsdUJBQU8sa0JBQVFHLElBQVIsQ0FBYUosS0FBYixFQUFvQkssSUFBcEIsQ0FBeUIsRUFBRUMsY0FBYyxNQUFoQixFQUF6QixDQUFQ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SixFIiwiZmlsZSI6IkVudHJpZXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZWVkcGFyc2VyIGZyb20gXCJmZWVkcGFyc2VyLXByb21pc2VkXCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuLi9tb2RlbHMvRW50cmllcy5tb2RlbFwiO1xuaW1wb3J0IEZlZWRzIGZyb20gXCIuLi9tb2RlbHMvRmVlZHMubW9kZWxcIjtcblxuY2xhc3MgRW50cmllc0NvbnRyb2xsZXIge1xuICAgIGdldChyZXEsIHJlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlRmVlZChyZXEucXVlcnkuZmVlZElkKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBxdWVyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmVlZF9pZDogcmVxLnF1ZXJ5LmZlZWRJZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gaWYgKHJlcS5xdWVyeS5oYXNPd25Qcm9wZXJ0eShcImhhc1JlYWRcIikpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcXVlcnlbXCJoYXNfcmVhZFwiXSA9IHJlcS5xdWVyeS5oYXNSZWFkO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gRW50cmllcy5maW5kKHF1ZXJ5KS5zb3J0KHsgcHVibGlzaF9kYXRlOiBcImRlc2NcIiB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihlbnRyaWVzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byB1cGRhdGUgYWxsIGZlZWRzLlwiICsgZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVNpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBFbnRyaWVzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZW50cnlJZCwgKGVyciwgZW50cnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVW5hYmxlIHRvIGZpbmQgdGhlIGVudHJ5IHdpdGggaWQ6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5wYXJhbXMuZW50cnlJZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVxLmJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJoYXNfcmVhZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5oYXNfcmVhZCA9IGRhdGEuaGFzX3JlYWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVudHJ5LnNhdmUoKGVyciwgbmV3RW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBzYXZlIHRoZSB1cGRhdGVkIGVudHJ5LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5OiBuZXdFbnRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUZlZWQoZmVlZElkKSB7XG4gICAgICAgIHJldHVybiBGZWVkcy5maW5kT25lKHsgX2lkOiBmZWVkSWQgfSlcbiAgICAgICAgICAgIC50aGVuKGZlZWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmZWVkcGFyc2VyLnBhcnNlKGZlZWQudXJsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihlbnRyaWVzID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZW50cnlQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5UHJvbWlzZXMucHVzaCh0aGlzLl9hZGROZXdFbnRyeShmZWVkSWQsIGVudHJ5KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGFsbCB0aGUgZW50cmllc1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChlbnRyeVByb21pc2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9hZGROZXdFbnRyeShmZWVkSWQsIG5ld0VudHJ5KSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgZmVlZF9pZDogZmVlZElkLFxuICAgICAgICAgICAgZ3VpZDogbmV3RW50cnkuZ3VpZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRW50cmllcy5maW5kT25lKHF1ZXJ5KS50aGVuKGZvdW5kRW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmb3VuZEVudHJ5IHx8ICFmb3VuZEVudHJ5Ll9pZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWRJZCxcbiAgICAgICAgICAgICAgICAgICAgZ3VpZDogbmV3RW50cnkuZ3VpZCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5ld0VudHJ5LnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBuZXdFbnRyeS5saW5rLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yOiBuZXdFbnRyeS5hdXRob3IsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG5ld0VudHJ5LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50X3NuaXBwZXQ6IG5ld0VudHJ5LnN1bW1hcnksXG4gICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hfZGF0ZTogbmV3RW50cnkucHViRGF0ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0ID0gbmV3IEVudHJpZXMoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc2VydC5zYXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRW50cmllc0NvbnRyb2xsZXIoKTtcbiJdfQ==