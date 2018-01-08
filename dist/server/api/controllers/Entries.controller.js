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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVGZWVkIiwicXVlcnkiLCJmZWVkSWQiLCJ0aGVuIiwiZmVlZF9pZCIsImhhc093blByb3BlcnR5IiwiaGFzUmVhZCIsImZpbmQiLCJzb3J0IiwicHVibGlzaF9kYXRlIiwianNvbiIsInN0YXR1cyIsImVudHJpZXMiLCJjYXRjaCIsImVycm9yIiwiZXJyIiwibWVzc2FnZSIsImZpbmRCeUlkIiwicGFyYW1zIiwiZW50cnlJZCIsImVudHJ5IiwiZGF0YSIsImJvZHkiLCJoYXNfcmVhZCIsInNhdmUiLCJuZXdFbnRyeSIsImZpbmRPbmUiLCJfaWQiLCJwYXJzZSIsImZlZWQiLCJ1cmwiLCJlbnRyeVByb21pc2VzIiwiZm9yRWFjaCIsInB1c2giLCJfYWRkTmV3RW50cnkiLCJQcm9taXNlIiwiYWxsIiwiZ3VpZCIsImZvdW5kRW50cnkiLCJ0aXRsZSIsImxpbmsiLCJjcmVhdG9yIiwiYXV0aG9yIiwiY29udGVudCIsImRlc2NyaXB0aW9uIiwiY29udGVudF9zbmlwcGV0Iiwic3VtbWFyeSIsInB1YkRhdGUiLCJpbnNlcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxpQjs7Ozs7Ozs0QkFDRUMsRyxFQUFLQyxHLEVBQUs7QUFDVixtQkFBTyxLQUFLQyxXQUFMLENBQWlCRixJQUFJRyxLQUFKLENBQVVDLE1BQTNCLEVBQ0ZDLElBREUsQ0FDRyxZQUFNO0FBQ1Isb0JBQUlGLFFBQVE7QUFDUkcsNkJBQVNOLElBQUlHLEtBQUosQ0FBVUM7QUFEWCxpQkFBWjtBQUdBLG9CQUFJSixJQUFJRyxLQUFKLENBQVVJLGNBQVYsQ0FBeUIsU0FBekIsQ0FBSixFQUF5QztBQUNyQ0osMEJBQU0sVUFBTixJQUFvQkgsSUFB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WTNCLElBQVosQ0FBZjtBQUNBLDJCQUFPMkIsT0FBT3hCLElBQVAsRUFBUDtBQUNIO0FBQ0QsdUJBQU8sSUFBUDtBQUNILGFBaEJNLENBQVA7QUFpQkg7Ozs7OztrQkFHVSxJQUFJM0IsaUJBQUosRSIsImZpbGUiOiJFbnRyaWVzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmVlZHBhcnNlciBmcm9tIFwiZmVlZHBhcnNlci1wcm9taXNlZFwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi4vbW9kZWxzL0VudHJpZXMubW9kZWxcIjtcbmltcG9ydCBGZWVkcyBmcm9tIFwiLi4vbW9kZWxzL0ZlZWRzLm1vZGVsXCI7XG5cbmNsYXNzIEVudHJpZXNDb250cm9sbGVyIHtcbiAgICBnZXQocmVxLCByZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUZlZWQocmVxLnF1ZXJ5LmZlZWRJZClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcXVlcnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IHJlcS5xdWVyeS5mZWVkSWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChyZXEucXVlcnkuaGFzT3duUHJvcGVydHkoXCJoYXNSZWFkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5W1wiaGFzX3JlYWRcIl0gPSByZXEucXVlcnkuaGFzUmVhZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVudHJpZXMuZmluZChxdWVyeSkuc29ydCh7IHB1Ymxpc2hfZGF0ZTogXCJkZXNjXCIgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZW50cmllcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgZW50cmllc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gdXBkYXRlIGFsbCBmZWVkcy5cIiArIGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVTaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgRW50cmllcy5maW5kQnlJZChyZXEucGFyYW1zLmVudHJ5SWQsIChlcnIsIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlVuYWJsZSB0byBmaW5kIHRoZSBlbnRyeSB3aXRoIGlkOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICByZXEucGFyYW1zLmVudHJ5SWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiaGFzX3JlYWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuaGFzX3JlYWQgPSBkYXRhLmhhc19yZWFkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbnRyeS5zYXZlKChlcnIsIG5ld0VudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gc2F2ZSB0aGUgdXBkYXRlZCBlbnRyeS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeTogbmV3RW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF91cGRhdGVGZWVkKGZlZWRJZCkge1xuICAgICAgICByZXR1cm4gRmVlZHMuZmluZE9uZSh7IF9pZDogZmVlZElkIH0pXG4gICAgICAgICAgICAudGhlbihmZWVkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmVlZHBhcnNlci5wYXJzZShmZWVkLnVybCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZW50cmllcyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVudHJ5UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeVByb21pc2VzLnB1c2godGhpcy5fYWRkTmV3RW50cnkoZmVlZElkLCBlbnRyeSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhbGwgdGhlIGVudHJpZXNcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZW50cnlQcm9taXNlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfYWRkTmV3RW50cnkoZmVlZElkLCBuZXdFbnRyeSkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHtcbiAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWRJZCxcbiAgICAgICAgICAgIGd1aWQ6IG5ld0VudHJ5Lmd1aWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEVudHJpZXMuZmluZE9uZShxdWVyeSkudGhlbihmb3VuZEVudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmICghZm91bmRFbnRyeSB8fCAhZm91bmRFbnRyeS5faWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBmZWVkX2lkOiBmZWVkSWQsXG4gICAgICAgICAgICAgICAgICAgIGd1aWQ6IG5ld0VudHJ5Lmd1aWQsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBuZXdFbnRyeS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogbmV3RW50cnkubGluayxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogbmV3RW50cnkuYXV0aG9yLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdFbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY29udGVudF9zbmlwcGV0OiBuZXdFbnRyeS5zdW1tYXJ5LFxuICAgICAgICAgICAgICAgICAgICBwdWJsaXNoX2RhdGU6IG5ld0VudHJ5LnB1YkRhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc2VydCA9IG5ldyBFbnRyaWVzKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnNlcnQuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEVudHJpZXNDb250cm9sbGVyKCk7XG4iXX0=