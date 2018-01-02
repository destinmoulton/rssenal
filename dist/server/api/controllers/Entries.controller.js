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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVBbGxGZWVkcyIsImUiLCJqc29uIiwic3RhdHVzIiwiZXJyb3IiLCJtZXNzYWdlIiwicXVlcnkiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc1JlYWQiLCJmaW5kIiwiZXJyIiwiZW50cmllcyIsInNvcnQiLCJwdWJsaXNoX2RhdGUiLCJmaW5kQnlJZCIsInBhcmFtcyIsImVudHJ5SWQiLCJlbnRyeSIsImRhdGEiLCJib2R5IiwiaGFzX3JlYWQiLCJzYXZlIiwibmV3RW50cnkiLCJmZWVkcyIsIkVycm9yIiwiZm9yRWFjaCIsInBhcnNlVVJMIiwiZmVlZCIsInVybCIsInBhcnNlZEZlZWQiLCJmZWVkX2lkIiwiX2lkIiwiZ3VpZCIsInBvc3NpYmxlRW50cnkiLCJsZW5ndGgiLCJpc29EYXRlIiwibGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLGlCOzs7Ozs7OzRCQUNFQyxHLEVBQUtDLEcsRUFBSztBQUNWLGdCQUFJO0FBQ0EscUJBQUtDLGVBQUw7QUFDSCxhQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1IsdUJBQU9GLElBQUlHLElBQUosQ0FBUztBQUNaQyw0QkFBUSxPQURJO0FBRVpDLDJCQUFPLGdDQUFnQ0gsRUFBRUk7QUFGN0IsaUJBQVQsQ0FBUDtBQUlIOztBQUVELGdCQUFJQyxRQUFRLEVBQVo7QUFDQSxnQkFBSVIsSUFBSVEsS0FBSixDQUFVQyxjQUFWLENBQXlCLFNBQXpCLENBQUosRUFBeUM7QUFDckNELHNCQUFNLFVBQU4sSUFBb0JSLElBQUlRLEtBQUosQ0FBVUUsT0FBOUI7QUFDSDtBQUNELDhCQUFRQyxJQUFSLENBQWFILEtBQWIsRUFBb0IsVUFBQ0ksR0FBRCxFQUFNQyxPQUFOLEVBQWtCO0FBQ2xDLG9CQUFJRCxHQUFKLEVBQVM7QUFDTFgsd0JBQUlHLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLCtCQUFPO0FBRkYscUJBQVQ7QUFJSCxpQkFMRCxNQUtPO0FBQ0hMLHdCQUFJRyxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsU0FESDtBQUVMUTtBQUZLLHFCQUFUO0FBSUg7QUFDSixhQVpELEVBWUdDLElBWkgsQ0FZUSxFQUFFQyxjQUFjLE1BQWhCLEVBWlI7QUFhSDs7O3FDQUVZZixHLEVBQUtDLEcsRUFBSztBQUNuQiw4QkFBUWUsUUFBUixDQUFpQmhCLElBQUlpQixNQUFKLENBQVdDLE9BQTVCLEVBQXFDLFVBQUNOLEdBQUQsRUFBTU8sS0FBTixFQUFnQjtBQUNqRCxvQkFBSVAsR0FBSixFQUFTO0FBQ0xYLHdCQUFJRyxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsT0FESDtBQUVMQywrQkFDSSx1Q0FDQU4sSUFBSWlCLE1BQUosQ0FBV0M7QUFKVixxQkFBVDtBQU1ILGlCQVBELE1BT087QUFDSCx3QkFBTUUsT0FBT3BCLElBQUlxQixJQUFqQjtBQUNBLHdCQUFJRCxLQUFLWCxjQUFMLENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakNVLDhCQUFNRyxRQUFOLEdBQWlCRixLQUFLRSxRQUF0QjtBQUNIO0FBQ0RILDBCQUFNSSxJQUFOLENBQVcsVUFBQ1gsR0FBRCxFQUFNWSxRQUFOLEVBQW1CO0FBQzFCLDRCQUFJWixHQUFKLEVBQVM7QUFDTFgsZ0NBQUlHLElBQUosQ0FBUztBQUNMQyx3Q0FBUSxPQURIO0FBRUxDLHVDQUFPO0FBRkYsNkJBQVQ7QUFJSCx5QkFMRCxNQUtPO0FBQ0hMLGdDQUFJRyxJQUFKLENBQVM7QUFDTEMsd0NBQVEsU0FESDtBQUVMYyx1Q0FBT0s7QUFGRiw2QkFBVDtBQUlIO0FBQ0oscUJBWkQ7QUFhSDtBQUNKLGFBM0JEO0FBNEJIOzs7MENBRWlCO0FBQ2QsNEJBQU1iLElBQU4sQ0FBVyxFQUFYLEVBQWUsVUFBQ0MsR0FBRCxFQUFNYSxLQUFOLEVBQWdCO0FBQzNCLG9CQUFJYixHQUFKLEVBQVM7QUFDTCwwQkFBTSxJQUFJYyxLQUFKLENBQVVkLEdBQVYsQ0FBTjtBQUNIOztBQUVEYSxzQkFBTUUsT0FBTixDQUFjLGdCQUFRO0FBQ2xCLHdDQUFPQyxRQUFQLENBQWdCQyxLQUFLQyxHQUFyQixFQUEwQixVQUFDbEIsR0FBRCxFQUFNbUIsVUFBTixFQUFxQjtBQUMzQzs7QUFFQUEsbUNBQVdGLElBQVgsQ0FBZ0JoQixPQUFoQixDQUF3QmMsT0FBeEIsQ0FBZ0MsaUJBQVM7QUFDckMsZ0NBQU1uQixRQUFRO0FBQ1Z3Qix5Q0FBU0gsS0FBS0ksR0FESjtBQUVWQyxzQ0FBTWYsTUFBTWU7QUFGRiw2QkFBZDtBQUlBLDhDQUFRdkIsSUFBUixDQUFhSCxLQUFiLEVBQW9CLFVBQUNJLEdBQUQsRUFBTXVCLGFBQU4sRUFBd0I7QUFDeEMsb0NBQUlBLGNBQWNDLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsd0NBQU1oQixvQkFDQ0QsS0FERDtBQUVGYSxpREFBU0gsS0FBS0ksR0FGWjtBQUdGbEIsc0RBQWNJLE1BQU1rQjtBQUhsQixzQ0FBTjtBQUtBLHdDQUFNYixXQUFXLHNCQUFZSixJQUFaLENBQWpCO0FBQ0FJLDZDQUFTRCxJQUFULENBQWMsVUFBQ1gsR0FBRCxFQUFNTyxLQUFOLEVBQWdCO0FBQzFCO0FBQ0gscUNBRkQ7QUFHSDtBQUNKLDZCQVpELEVBWUdtQixLQVpILENBWVMsQ0FaVDtBQWFILHlCQWxCRDtBQW1CSCxxQkF0QkQ7QUF1QkgsaUJBeEJEO0FBeUJILGFBOUJEO0FBK0JIOzs7Ozs7a0JBR1UsSUFBSXZDLGlCQUFKLEUiLCJmaWxlIjoiRW50cmllcy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlciBmcm9tIFwicnNzLXBhcnNlclwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi4vbW9kZWxzL0VudHJpZXMubW9kZWxcIjtcbmltcG9ydCBGZWVkcyBmcm9tIFwiLi4vbW9kZWxzL0ZlZWRzLm1vZGVsXCI7XG5cbmNsYXNzIEVudHJpZXNDb250cm9sbGVyIHtcbiAgICBnZXQocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUFsbEZlZWRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHVwZGF0ZSBhbGwgZmVlZHMuXCIgKyBlLm1lc3NhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0ge307XG4gICAgICAgIGlmIChyZXEucXVlcnkuaGFzT3duUHJvcGVydHkoXCJoYXNSZWFkXCIpKSB7XG4gICAgICAgICAgICBxdWVyeVtcImhhc19yZWFkXCJdID0gcmVxLnF1ZXJ5Lmhhc1JlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgRW50cmllcy5maW5kKHF1ZXJ5LCAoZXJyLCBlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIGdldCBhbGwgZW50cmllcy5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc29ydCh7IHB1Ymxpc2hfZGF0ZTogXCJkZXNjXCIgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEVudHJpZXMuZmluZEJ5SWQocmVxLnBhcmFtcy5lbnRyeUlkLCAoZXJyLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVbmFibGUgdG8gZmluZCB0aGUgZW50cnkgd2l0aCBpZDogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnBhcmFtcy5lbnRyeUlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXEuYm9keTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShcImhhc19yZWFkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Lmhhc19yZWFkID0gZGF0YS5oYXNfcmVhZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW50cnkuc2F2ZSgoZXJyLCBuZXdFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHNhdmUgdGhlIHVwZGF0ZWQgZW50cnkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnk6IG5ld0VudHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfdXBkYXRlQWxsRmVlZHMoKSB7XG4gICAgICAgIEZlZWRzLmZpbmQoe30sIChlcnIsIGZlZWRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlZWRzLmZvckVhY2goZmVlZCA9PiB7XG4gICAgICAgICAgICAgICAgcGFyc2VyLnBhcnNlVVJMKGZlZWQudXJsLCAoZXJyLCBwYXJzZWRGZWVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEFkZCBlcnIgaGFuZGxlcj9cblxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRGZWVkLmZlZWQuZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWQuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1aWQ6IGVudHJ5Lmd1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBFbnRyaWVzLmZpbmQocXVlcnksIChlcnIsIHBvc3NpYmxlRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVFbnRyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmVudHJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlZF9pZDogZmVlZC5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoX2RhdGU6IGVudHJ5Lmlzb0RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RW50cnkgPSBuZXcgRW50cmllcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RW50cnkuc2F2ZSgoZXJyLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQWRkIGVyciBoYW5kbGVyP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5saW1pdCgxKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRW50cmllc0NvbnRyb2xsZXIoKTtcbiJdfQ==