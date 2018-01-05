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
                this._updateFeed(req.query.feedId);
            } catch (e) {
                return res.json({
                    status: "error",
                    error: "Unable to update all feeds." + e.message
                });
            }

            var query = {
                feed_id: req.query.feedId
            };
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
            }).sort({ publish_date: "desc" });
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
            _Feeds2.default.findOne({ _id: feedId }, function (err, feed) {
                if (err) {
                    throw new Error(err);
                }

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
        }
    }]);

    return EntriesController;
}();

exports.default = new EntriesController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVGZWVkIiwicXVlcnkiLCJmZWVkSWQiLCJlIiwianNvbiIsInN0YXR1cyIsImVycm9yIiwibWVzc2FnZSIsImZlZWRfaWQiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc1JlYWQiLCJmaW5kIiwiZXJyIiwiZW50cmllcyIsInNvcnQiLCJwdWJsaXNoX2RhdGUiLCJmaW5kQnlJZCIsInBhcmFtcyIsImVudHJ5SWQiLCJlbnRyeSIsImRhdGEiLCJib2R5IiwiaGFzX3JlYWQiLCJzYXZlIiwibmV3RW50cnkiLCJmaW5kT25lIiwiX2lkIiwiZmVlZCIsIkVycm9yIiwicGFyc2VVUkwiLCJ1cmwiLCJwYXJzZWRGZWVkIiwiZm9yRWFjaCIsImd1aWQiLCJwb3NzaWJsZUVudHJ5IiwibGVuZ3RoIiwiaXNvRGF0ZSIsImxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxpQjs7Ozs7Ozs0QkFDRUMsRyxFQUFLQyxHLEVBQUs7QUFDVixnQkFBSTtBQUNBLHFCQUFLQyxXQUFMLENBQWlCRixJQUFJRyxLQUFKLENBQVVDLE1BQTNCO0FBQ0gsYUFGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNSLHVCQUFPSixJQUFJSyxJQUFKLENBQVM7QUFDWkMsNEJBQVEsT0FESTtBQUVaQywyQkFBTyxnQ0FBZ0NILEVBQUVJO0FBRjdCLGlCQUFULENBQVA7QUFJSDs7QUFFRCxnQkFBSU4sUUFBUTtBQUNSTyx5QkFBU1YsSUFBSUcsS0FBSixDQUFVQztBQURYLGFBQVo7QUFHQSxnQkFBSUosSUFBSUcsS0FBSixDQUFVUSxjQUFWLENBQXlCLFNBQXpCLENBQUosRUFBeUM7QUFDckNSLHNCQUFNLFVBQU4sSUFBb0JILElBQUlHLEtBQUosQ0FBVVMsT0FBOUI7QUFDSDtBQUNELDhCQUFRQyxJQUFSLENBQWFWLEtBQWIsRUFBb0IsVUFBQ1csR0FBRCxFQUFNQyxPQUFOLEVBQWtCO0FBQ2xDLG9CQUFJRCxHQUFKLEVBQVM7QUFDTGIsd0JBQUlLLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLCtCQUFPO0FBRkYscUJBQVQ7QUFJSCxpQkFMRCxNQUtPO0FBQ0hQLHdCQUFJSyxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsU0FESDtBQUVMUTtBQUZLLHFCQUFUO0FBSUg7QUFDSixhQVpELEVBWUdDLElBWkgsQ0FZUSxFQUFFQyxjQUFjLE1BQWhCLEVBWlI7QUFhSDs7O3FDQUVZakIsRyxFQUFLQyxHLEVBQUs7QUFDbkIsOEJBQVFpQixRQUFSLENBQWlCbEIsSUFBSW1CLE1BQUosQ0FBV0MsT0FBNUIsRUFBcUMsVUFBQ04sR0FBRCxFQUFNTyxLQUFOLEVBQWdCO0FBQ2pELG9CQUFJUCxHQUFKLEVBQVM7QUFDTGIsd0JBQUlLLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLCtCQUNJLHVDQUNBUixJQUFJbUIsTUFBSixDQUFXQztBQUpWLHFCQUFUO0FBTUgsaUJBUEQsTUFPTztBQUNILHdCQUFNRSxPQUFPdEIsSUFBSXVCLElBQWpCO0FBQ0Esd0JBQUlELEtBQUtYLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBSixFQUFxQztBQUNqQ1UsOEJBQU1HLFFBQU4sR0FBaUJGLEtBQUtFLFFBQXRCO0FBQ0g7QUFDREgsMEJBQU1JLElBQU4sQ0FBVyxVQUFDWCxHQUFELEVBQU1ZLFFBQU4sRUFBbUI7QUFDMUIsNEJBQUlaLEdBQUosRUFBUztBQUNMYixnQ0FBSUssSUFBSixDQUFTO0FBQ0xDLHdDQUFRLE9BREg7QUFFTEMsdUNBQU87QUFGRiw2QkFBVDtBQUlILHlCQUxELE1BS087QUFDSFAsZ0NBQUlLLElBQUosQ0FBUztBQUNMQyx3Q0FBUSxTQURIO0FBRUxjLHVDQUFPSztBQUZGLDZCQUFUO0FBSUg7QUFDSixxQkFaRDtBQWFIO0FBQ0osYUEzQkQ7QUE0Qkg7OztvQ0FFV3RCLE0sRUFBUTtBQUNoQiw0QkFBTXVCLE9BQU4sQ0FBYyxFQUFFQyxLQUFLeEIsTUFBUCxFQUFkLEVBQStCLFVBQUNVLEdBQUQsRUFBTWUsSUFBTixFQUFlO0FBQzFDLG9CQUFJZixHQUFKLEVBQVM7QUFDTCwwQkFBTSxJQUFJZ0IsS0FBSixDQUFVaEIsR0FBVixDQUFOO0FBQ0g7O0FBRUQsb0NBQU9pQixRQUFQLENBQWdCRixLQUFLRyxHQUFyQixFQUEwQixVQUFDbEIsR0FBRCxFQUFNbUIsVUFBTixFQUFxQjtBQUMzQzs7QUFFQUEsK0JBQVdKLElBQVgsQ0FBZ0JkLE9BQWhCLENBQXdCbUIsT0FBeEIsQ0FBZ0MsaUJBQVM7QUFDckMsNEJBQU0vQixRQUFRO0FBQ1ZPLHFDQUFTbUIsS0FBS0QsR0FESjtBQUVWTyxrQ0FBTWQsTUFBTWM7QUFGRix5QkFBZDtBQUlBLDBDQUFRdEIsSUFBUixDQUFhVixLQUFiLEVBQW9CLFVBQUNXLEdBQUQsRUFBTXNCLGFBQU4sRUFBd0I7QUFDeEMsZ0NBQUlBLGNBQWNDLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsb0NBQU1mLG9CQUNDRCxLQUREO0FBRUZYLDZDQUFTbUIsS0FBS0QsR0FGWjtBQUdGWCxrREFBY0ksTUFBTWlCO0FBSGxCLGtDQUFOO0FBS0Esb0NBQU1aLFdBQVcsc0JBQVlKLElBQVosQ0FBakI7QUFDQUkseUNBQVNELElBQVQsQ0FBYyxVQUFDWCxHQUFELEVBQU1PLEtBQU4sRUFBZ0I7QUFDMUI7QUFDSCxpQ0FGRDtBQUdIO0FBQ0oseUJBWkQsRUFZR2tCLEtBWkgsQ0FZUyxDQVpUO0FBYUgscUJBbEJEO0FBbUJILGlCQXRCRDtBQXVCSCxhQTVCRDtBQTZCSDs7Ozs7O2tCQUdVLElBQUl4QyxpQkFBSixFIiwiZmlsZSI6IkVudHJpZXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXJzZXIgZnJvbSBcInJzcy1wYXJzZXJcIjtcblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4uL21vZGVscy9FbnRyaWVzLm1vZGVsXCI7XG5pbXBvcnQgRmVlZHMgZnJvbSBcIi4uL21vZGVscy9GZWVkcy5tb2RlbFwiO1xuXG5jbGFzcyBFbnRyaWVzQ29udHJvbGxlciB7XG4gICAgZ2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVGZWVkKHJlcS5xdWVyeS5mZWVkSWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byB1cGRhdGUgYWxsIGZlZWRzLlwiICsgZS5tZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBxdWVyeSA9IHtcbiAgICAgICAgICAgIGZlZWRfaWQ6IHJlcS5xdWVyeS5mZWVkSWRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlcS5xdWVyeS5oYXNPd25Qcm9wZXJ0eShcImhhc1JlYWRcIikpIHtcbiAgICAgICAgICAgIHF1ZXJ5W1wiaGFzX3JlYWRcIl0gPSByZXEucXVlcnkuaGFzUmVhZDtcbiAgICAgICAgfVxuICAgICAgICBFbnRyaWVzLmZpbmQocXVlcnksIChlcnIsIGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gZ2V0IGFsbCBlbnRyaWVzLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgZW50cmllc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zb3J0KHsgcHVibGlzaF9kYXRlOiBcImRlc2NcIiB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVTaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgRW50cmllcy5maW5kQnlJZChyZXEucGFyYW1zLmVudHJ5SWQsIChlcnIsIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlVuYWJsZSB0byBmaW5kIHRoZSBlbnRyeSB3aXRoIGlkOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICByZXEucGFyYW1zLmVudHJ5SWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KFwiaGFzX3JlYWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuaGFzX3JlYWQgPSBkYXRhLmhhc19yZWFkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbnRyeS5zYXZlKChlcnIsIG5ld0VudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gc2F2ZSB0aGUgdXBkYXRlZCBlbnRyeS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeTogbmV3RW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF91cGRhdGVGZWVkKGZlZWRJZCkge1xuICAgICAgICBGZWVkcy5maW5kT25lKHsgX2lkOiBmZWVkSWQgfSwgKGVyciwgZmVlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJzZXIucGFyc2VVUkwoZmVlZC51cmwsIChlcnIsIHBhcnNlZEZlZWQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBZGQgZXJyIGhhbmRsZXI/XG5cbiAgICAgICAgICAgICAgICBwYXJzZWRGZWVkLmZlZWQuZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkX2lkOiBmZWVkLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWQ6IGVudHJ5Lmd1aWRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgRW50cmllcy5maW5kKHF1ZXJ5LCAoZXJyLCBwb3NzaWJsZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVFbnRyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlZF9pZDogZmVlZC5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hfZGF0ZTogZW50cnkuaXNvRGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RW50cnkgPSBuZXcgRW50cmllcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdFbnRyeS5zYXZlKChlcnIsIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkubGltaXQoMSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRW50cmllc0NvbnRyb2xsZXIoKTtcbiJdfQ==