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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsInJlcSIsInJlcyIsIl91cGRhdGVBbGxGZWVkcyIsImUiLCJqc29uIiwic3RhdHVzIiwiZXJyb3IiLCJtZXNzYWdlIiwicXVlcnkiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc1JlYWQiLCJmaW5kIiwiZXJyIiwiZW50cmllcyIsInNvcnQiLCJwdWJsaXNoX2RhdGUiLCJmaW5kQnlJZCIsInBhcmFtcyIsImVudHJ5SWQiLCJlbnRyeSIsImRhdGEiLCJib2R5IiwiaGFzX3JlYWQiLCJzYXZlIiwibmV3RW50cnkiLCJmZWVkcyIsIkVycm9yIiwiZm9yRWFjaCIsImZlZWQiLCJwYXJzZVVSTCIsInVybCIsInBhcnNlZEZlZWQiLCJmZWVkX2lkIiwiX2lkIiwiZ3VpZCIsInBvc3NpYmxlRW50cnkiLCJsZW5ndGgiLCJpc29EYXRlIiwibGltaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBR01BLGlCOzs7Ozs7OzRCQUVFQyxHLEVBQUtDLEcsRUFBSTtBQUNULGdCQUFJO0FBQ0EscUJBQUtDLGVBQUw7QUFDSCxhQUZELENBRUUsT0FBTUMsQ0FBTixFQUFRO0FBQ04sdUJBQU9GLElBQUlHLElBQUosQ0FBUztBQUNaQyw0QkFBUSxPQURJO0FBRVpDLDJCQUFPLGdDQUFnQ0gsRUFBRUk7QUFGN0IsaUJBQVQsQ0FBUDtBQUlIOztBQUVELGdCQUFJQyxRQUFRLEVBQVo7QUFDQSxnQkFBR1IsSUFBSVEsS0FBSixDQUFVQyxjQUFWLENBQXlCLFNBQXpCLENBQUgsRUFBdUM7QUFDbkNELHNCQUFNLFVBQU4sSUFBb0JSLElBQUlRLEtBQUosQ0FBVUUsT0FBOUI7QUFDSDtBQUNELDhCQUNLQyxJQURMLENBQ1VILEtBRFYsRUFDaUIsVUFBQ0ksR0FBRCxFQUFNQyxPQUFOLEVBQWdCO0FBQ3pCLG9CQUFHRCxHQUFILEVBQU87QUFDSFgsd0JBQUlHLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLCtCQUFPO0FBRkYscUJBQVQ7QUFJSCxpQkFMRCxNQUtPO0FBQ0hMLHdCQUFJRyxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsU0FESDtBQUVMUTtBQUZLLHFCQUFUO0FBSUg7QUFDSixhQWJMLEVBY0tDLElBZEwsQ0FjVSxFQUFDQyxjQUFjLE1BQWYsRUFkVjtBQWVIOzs7cUNBRVlmLEcsRUFBS0MsRyxFQUFJO0FBQ2xCLDhCQUFRZSxRQUFSLENBQWlCaEIsSUFBSWlCLE1BQUosQ0FBV0MsT0FBNUIsRUFBcUMsVUFBQ04sR0FBRCxFQUFNTyxLQUFOLEVBQWM7QUFDL0Msb0JBQUdQLEdBQUgsRUFBTztBQUNIWCx3QkFBSUcsSUFBSixDQUFTO0FBQ0xDLGdDQUFRLE9BREg7QUFFTEMsK0JBQU8sdUNBQXFDTixJQUFJaUIsTUFBSixDQUFXQztBQUZsRCxxQkFBVDtBQUlILGlCQUxELE1BS087QUFDSCx3QkFBTUUsT0FBT3BCLElBQUlxQixJQUFqQjtBQUNBLHdCQUFHRCxLQUFLWCxjQUFMLENBQW9CLFVBQXBCLENBQUgsRUFBbUM7QUFDL0JVLDhCQUFNRyxRQUFOLEdBQWlCRixLQUFLRSxRQUF0QjtBQUNIO0FBQ0RILDBCQUFNSSxJQUFOLENBQVcsVUFBQ1gsR0FBRCxFQUFNWSxRQUFOLEVBQWlCO0FBQ3hCLDRCQUFHWixHQUFILEVBQU87QUFDSFgsZ0NBQUlHLElBQUosQ0FBUztBQUNMQyx3Q0FBUSxPQURIO0FBRUxDLHVDQUFPO0FBRkYsNkJBQVQ7QUFJSCx5QkFMRCxNQUtPO0FBQ0hMLGdDQUFJRyxJQUFKLENBQVM7QUFDTEMsd0NBQVEsU0FESDtBQUVMYyx1Q0FBT0s7QUFGRiw2QkFBVDtBQUlIO0FBQ0oscUJBWkQ7QUFhSDtBQUNKLGFBekJEO0FBMEJIOzs7MENBRWdCOztBQUViLDRCQUFNYixJQUFOLENBQVcsRUFBWCxFQUFlLFVBQUNDLEdBQUQsRUFBTWEsS0FBTixFQUFjO0FBQ3pCLG9CQUFHYixHQUFILEVBQVE7QUFDSiwwQkFBTSxJQUFJYyxLQUFKLENBQVVkLEdBQVYsQ0FBTjtBQUNIOztBQUVEYSxzQkFBTUUsT0FBTixDQUFjLFVBQUNDLElBQUQsRUFBUTtBQUNsQix3Q0FBT0MsUUFBUCxDQUFnQkQsS0FBS0UsR0FBckIsRUFBMEIsVUFBQ2xCLEdBQUQsRUFBTW1CLFVBQU4sRUFBbUI7QUFDekM7O0FBRUFBLG1DQUFXSCxJQUFYLENBQWdCZixPQUFoQixDQUF3QmMsT0FBeEIsQ0FBZ0MsVUFBQ1IsS0FBRCxFQUFTO0FBQ3JDLGdDQUFNWCxRQUFRO0FBQ1Z3Qix5Q0FBU0osS0FBS0ssR0FESjtBQUVWQyxzQ0FBTWYsTUFBTWU7QUFGRiw2QkFBZDtBQUlBLDhDQUFRdkIsSUFBUixDQUFhSCxLQUFiLEVBQW9CLFVBQUNJLEdBQUQsRUFBTXVCLGFBQU4sRUFBc0I7QUFDdEMsb0NBQUdBLGNBQWNDLE1BQWQsS0FBeUIsQ0FBNUIsRUFBOEI7QUFDMUIsd0NBQU1oQixvQkFDQ0QsS0FERDtBQUVGYSxpREFBU0osS0FBS0ssR0FGWjtBQUdGbEIsc0RBQWNJLE1BQU1rQjtBQUhsQixzQ0FBTjtBQUtBLHdDQUFNYixXQUFXLHNCQUFZSixJQUFaLENBQWpCO0FBQ0FJLDZDQUFTRCxJQUFULENBQWMsVUFBQ1gsR0FBRCxFQUFNTyxLQUFOLEVBQWM7QUFDeEI7QUFDSCxxQ0FGRDtBQUdIO0FBQ0osNkJBWkQsRUFZR21CLEtBWkgsQ0FZUyxDQVpUO0FBYUgseUJBbEJEO0FBbUJILHFCQXRCRDtBQXVCSCxpQkF4QkQ7QUF5QkgsYUE5QkQ7QUErQkg7Ozs7OztrQkFHVSxJQUFJdkMsaUJBQUosRSIsImZpbGUiOiJFbnRyaWVzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBwYXJzZXIgZnJvbSBcInJzcy1wYXJzZXJcIjtcblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4uL21vZGVscy9FbnRyaWVzLm1vZGVsXCI7XG5pbXBvcnQgRmVlZHMgZnJvbSBcIi4uL21vZGVscy9GZWVkcy5tb2RlbFwiO1xuXG5cbmNsYXNzIEVudHJpZXNDb250cm9sbGVyIHtcblxuICAgIGdldChyZXEsIHJlcyl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVBbGxGZWVkcygpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gdXBkYXRlIGFsbCBmZWVkcy5cIiArIGUubWVzc2FnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBxdWVyeSA9IHt9O1xuICAgICAgICBpZihyZXEucXVlcnkuaGFzT3duUHJvcGVydHkoXCJoYXNSZWFkXCIpKXtcbiAgICAgICAgICAgIHF1ZXJ5W1wiaGFzX3JlYWRcIl0gPSByZXEucXVlcnkuaGFzUmVhZDtcbiAgICAgICAgfVxuICAgICAgICBFbnRyaWVzXG4gICAgICAgICAgICAuZmluZChxdWVyeSwgKGVyciwgZW50cmllcyk9PntcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBnZXQgYWxsIGVudHJpZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0KHtwdWJsaXNoX2RhdGU6ICdkZXNjJ30pO1xuICAgIH1cblxuICAgIHVwZGF0ZVNpbmdsZShyZXEsIHJlcyl7XG4gICAgICAgIEVudHJpZXMuZmluZEJ5SWQocmVxLnBhcmFtcy5lbnRyeUlkLCAoZXJyLCBlbnRyeSk9PntcbiAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIGZpbmQgdGhlIGVudHJ5IHdpdGggaWQ6IFwiK3JlcS5wYXJhbXMuZW50cnlJZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXEuYm9keTtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmhhc093blByb3BlcnR5KFwiaGFzX3JlYWRcIikpe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5oYXNfcmVhZCA9IGRhdGEuaGFzX3JlYWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVudHJ5LnNhdmUoKGVyciwgbmV3RW50cnkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHNhdmUgdGhlIHVwZGF0ZWQgZW50cnkuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeTogbmV3RW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgX3VwZGF0ZUFsbEZlZWRzKCl7XG5cbiAgICAgICAgRmVlZHMuZmluZCh7fSwgKGVyciwgZmVlZHMpPT57XG4gICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmVlZHMuZm9yRWFjaCgoZmVlZCk9PntcbiAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2VVUkwoZmVlZC51cmwsIChlcnIsIHBhcnNlZEZlZWQpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEFkZCBlcnIgaGFuZGxlcj9cblxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRGZWVkLmZlZWQuZW50cmllcy5mb3JFYWNoKChlbnRyeSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWQuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1aWQ6IGVudHJ5Lmd1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIEVudHJpZXMuZmluZChxdWVyeSwgKGVyciwgcG9zc2libGVFbnRyeSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwb3NzaWJsZUVudHJ5Lmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRfaWQ6IGZlZWQuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaF9kYXRlOiBlbnRyeS5pc29EYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RW50cnkgPSBuZXcgRW50cmllcyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RW50cnkuc2F2ZSgoZXJyLCBlbnRyeSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5saW1pdCgxKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEVudHJpZXNDb250cm9sbGVyKCk7Il19