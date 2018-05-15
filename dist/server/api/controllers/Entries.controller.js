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

                if (req.query.hasOwnProperty("showEntriesHasRead")) {
                    if (req.query["showEntriesHasRead"] === "false") {
                        // This logic might seem odd,
                        // but we only want to add this query parameter
                        // when we do NOT want to view the has_read entries
                        query["has_read"] = false;
                    }
                }
                return _Entries2.default.find(query).sort({
                    publish_date: "desc"
                });
            }).then(function (entries) {
                return res.json({
                    status: "success",
                    entries: entries
                });
            }).catch(function (err) {
                return res.json({
                    status: "error",
                    error: "Unable to get entries for feed. " + err.message + ". Feed ID " + req.query.feedId
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

            return _Feeds2.default.findOne({
                _id: feedId
            }).then(function (feed) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVGZWVkIiwicXVlcnkiLCJmZWVkSWQiLCJ0aGVuIiwiZmVlZF9pZCIsImhhc093blByb3BlcnR5IiwiZmluZCIsInNvcnQiLCJwdWJsaXNoX2RhdGUiLCJqc29uIiwic3RhdHVzIiwiZW50cmllcyIsImNhdGNoIiwiZXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwiZmluZEJ5SWQiLCJwYXJhbXMiLCJlbnRyeUlkIiwiZW50cnkiLCJkYXRhIiwiYm9keSIsImhhc19yZWFkIiwic2F2ZSIsIm5ld0VudHJ5IiwiZmluZE9uZSIsIl9pZCIsInBhcnNlIiwiZmVlZCIsInVybCIsImVudHJ5UHJvbWlzZXMiLCJmb3JFYWNoIiwicHVzaCIsIl9hZGROZXdFbnRyeSIsIlByb21pc2UiLCJhbGwiLCJndWlkIiwiZm91bmRFbnRyeSIsInRpdGxlIiwibGluayIsImNyZWF0b3IiLCJhdXRob3IiLCJjb250ZW50IiwiZGVzY3JpcHRpb24iLCJjb250ZW50X3NuaXBwZXQiLCJzdW1tYXJ5IiwicHViRGF0ZSIsImluc2VydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLGlCOzs7Ozs7OzRCQUNFQyxHLEVBQUtDLEcsRUFBSztBQUNWLG1CQUFPLEtBQUtDLFdBQUwsQ0FBaUJGLElBQUlHLEtBQUosQ0FBVUMsTUFBM0IsRUFDRkMsSUFERSxDQUNHLFlBQU07QUFDUixvQkFBSUYsUUFBUTtBQUNSRyw2QkFBU04sSUFBSUcsS0FBSixDQUFVQztBQURYLGlCQUFaOztBQUlBLG9CQUFJSixJQUFJRyxLQUFKLENBQVVJLGNBQVYsQ0FBeUIsb0JBQXpCLENBQUosRUFBb0Q7QUFDaEQsd0JBQUlQLElBQUlHLEtBQUosQ0FBVSxvQkFBVixN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QUFTbUIsV0FOVDtBQU9UQyx5Q0FBaUJwQixTQUFTcUIsT0FQakI7QUFRVHJDLHNDQUFjZ0IsU0FBU3NCO0FBUmQscUJBQWI7QUFVQSx3QkFBTUMsU0FBUyxzQkFBWTNCLElBQVosQ0FBZjtBQUNBLDJCQUFPMkIsT0FBT3hCLElBQVAsRUFBUDtBQUNIO0FBQ0QsdUJBQU8sSUFBUDtBQUNILGFBaEJNLENBQVA7QUFpQkg7Ozs7OztrQkFHVSxJQUFJMUIsaUJBQUosRSIsImZpbGUiOiJFbnRyaWVzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmVlZHBhcnNlciBmcm9tIFwiZmVlZHBhcnNlci1wcm9taXNlZFwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi4vbW9kZWxzL0VudHJpZXMubW9kZWxcIjtcbmltcG9ydCBGZWVkcyBmcm9tIFwiLi4vbW9kZWxzL0ZlZWRzLm1vZGVsXCI7XG5cbmNsYXNzIEVudHJpZXNDb250cm9sbGVyIHtcbiAgICBnZXQocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUZlZWQocmVxLnF1ZXJ5LmZlZWRJZClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IHJlcS5xdWVyeS5mZWVkSWRcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcS5xdWVyeS5oYXNPd25Qcm9wZXJ0eShcInNob3dFbnRyaWVzSGFzUmVhZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnF1ZXJ5W1wic2hvd0VudHJpZXNIYXNSZWFkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgbG9naWMgbWlnaHQgc2VlbSBvZGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgd2Ugb25seSB3YW50IHRvIGFkZCB0aGlzIHF1ZXJ5IHBhcmFtZXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB3ZSBkbyBOT1Qgd2FudCB0byB2aWV3IHRoZSBoYXNfcmVhZCBlbnRyaWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVtcImhhc19yZWFkXCJdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVudHJpZXMuZmluZChxdWVyeSkuc29ydCh7XG4gICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hfZGF0ZTogXCJkZXNjXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihlbnRyaWVzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBnZXQgZW50cmllcyBmb3IgZmVlZC4gXCIgKyBlcnIubWVzc2FnZSArIFwiLiBGZWVkIElEIFwiICsgcmVxLnF1ZXJ5LmZlZWRJZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEVudHJpZXMuZmluZEJ5SWQocmVxLnBhcmFtcy5lbnRyeUlkLCAoZXJyLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBmaW5kIHRoZSBlbnRyeSB3aXRoIGlkOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICByZXEucGFyYW1zLmVudHJ5SWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiaGFzX3JlYWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuaGFzX3JlYWQgPSBkYXRhLmhhc19yZWFkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbnRyeS5zYXZlKChlcnIsIG5ld0VudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gc2F2ZSB0aGUgdXBkYXRlZCBlbnRyeS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeTogbmV3RW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF91cGRhdGVGZWVkKGZlZWRJZCkge1xuICAgICAgICByZXR1cm4gRmVlZHMuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgX2lkOiBmZWVkSWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmZWVkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmVlZHBhcnNlci5wYXJzZShmZWVkLnVybCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZW50cmllcyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVudHJ5UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVByb21pc2VzLnB1c2godGhpcy5fYWRkTmV3RW50cnkoZmVlZElkLCBlbnRyeSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbGwgdGhlIGVudHJpZXNcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZW50cnlQcm9taXNlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfYWRkTmV3RW50cnkoZmVlZElkLCBuZXdFbnRyeSkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWRJZCxcbiAgICAgICAgICAgIGd1aWQ6IG5ld0VudHJ5Lmd1aWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEVudHJpZXMuZmluZE9uZShxdWVyeSkudGhlbihmb3VuZEVudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmICghZm91bmRFbnRyeSB8fCAhZm91bmRFbnRyeS5faWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBmZWVkX2lkOiBmZWVkSWQsXG4gICAgICAgICAgICAgICAgICAgIGd1aWQ6IG5ld0VudHJ5Lmd1aWQsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBuZXdFbnRyeS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogbmV3RW50cnkubGluayxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogbmV3RW50cnkuYXV0aG9yLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdFbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY29udGVudF9zbmlwcGV0OiBuZXdFbnRyeS5zdW1tYXJ5LFxuICAgICAgICAgICAgICAgICAgICBwdWJsaXNoX2RhdGU6IG5ld0VudHJ5LnB1YkRhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc2VydCA9IG5ldyBFbnRyaWVzKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnNlcnQuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEVudHJpZXNDb250cm9sbGVyKCk7Il19