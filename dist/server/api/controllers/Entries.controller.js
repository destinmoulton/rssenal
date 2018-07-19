"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _feedparserPromised = require("feedparser-promised");

var _feedparserPromised2 = _interopRequireDefault(_feedparserPromised);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _Entries = require("../models/Entries.model");

var _Entries2 = _interopRequireDefault(_Entries);

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EntriesController {
    constructor() {
        this._updateFeedEntries = async feedId => {
            try {
                const feed = await _Feeds2.default.findOne({
                    _id: feedId
                });

                const timeAgo = (0, _moment2.default)().subtract(15, "minutes");
                if (feed.last_updated !== undefined && (0, _moment2.default)(feed.last_updated).isAfter(timeAgo)) {
                    // The feed was recently updated, so no need to parse
                    return true;
                }

                // Get and parse the RSS feed
                const entries = await _feedparserPromised2.default.parse(feed.url);

                entries.forEach(async entry => {
                    await this._addNewEntry(feedId, entry);
                });

                // Update the time of update
                feed.last_updated = new Date();
                await feed.save(err => {
                    if (err) {
                        throw new Error(err);
                    }
                });

                return true;
            } catch (err) {
                throw err;
            }
        };

        this._addNewEntry = async (feedId, newEntry) => {
            const query = {
                feed_id: feedId,
                guid: newEntry.guid
            };

            try {
                const foundEntry = await _Entries2.default.findOne(query);
                if (!foundEntry || !foundEntry._id) {
                    const data = {
                        feed_id: feedId,
                        guid: newEntry.guid,
                        title: newEntry.title,
                        link: newEntry.link,
                        creator: newEntry.author,
                        content: newEntry.description,
                        content_snippet: newEntry.summary,
                        publish_date: newEntry.pubDate
                    };
                    const insert = new _Entries2.default(data);
                    return await insert.save();
                }
                return true;
            } catch (err) {
                throw err;
            }
        };
    }

    async get(req, res) {
        try {
            await this._updateFeedEntries(req.query.feedId);

            let query = {
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
            const entries = await _Entries2.default.find(query).sort({
                publish_date: "desc"
            });

            return res.json({
                status: "success",
                entries
            });
        } catch (err) {
            return res.json({
                status: "error",
                error: "Unable to get entries for feed. " + err.message + ". Feed ID " + req.query.feedId
            });
        }
    }

    updateSingle(req, res) {
        _Entries2.default.findById(req.params.entryId, (err, entry) => {
            if (err) {
                res.json({
                    status: "error",
                    error: "Unable to find the entry with id: " + req.params.entryId
                });
            } else {
                const data = req.body;
                if (data.hasOwnProperty("has_read")) {
                    entry.has_read = data.has_read;
                }
                entry.save((err, newEntry) => {
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

}

exports.default = new EntriesController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0VudHJpZXMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJFbnRyaWVzQ29udHJvbGxlciIsIl91cGRhdGVGZWVkRW50cmllcyIsImZlZWRJZCIsImZlZWQiLCJmaW5kT25lIiwiX2lkIiwidGltZUFnbyIsInN1YnRyYWN0IiwibGFzdF91cGRhdGVkIiwidW5kZWZpbmVkIiwiaXNBZnRlciIsImVudHJpZXMiLCJwYXJzZSIsInVybCIsImZvckVhY2giLCJlbnRyeSIsIl9hZGROZXdFbnRyeSIsIkRhdGUiLCJzYXZlIiwiZXJyIiwiRXJyb3IiLCJuZXdFbnRyeSIsInF1ZXJ5IiwiZmVlZF9pZCIsImd1aWQiLCJmb3VuZEVudHJ5IiwiZGF0YSIsInRpdGxlIiwibGluayIsImNyZWF0b3IiLCJhdXRob3IiLCJjb250ZW50IiwiZGVzY3JpcHRpb24iLCJjb250ZW50X3NuaXBwZXQiLCJzdW1tYXJ5IiwicHVibGlzaF9kYXRlIiwicHViRGF0ZSIsImluc2VydCIsImdldCIsInJlcSIsInJlcyIsImhhc093blByb3BlcnR5IiwiZmluZCIsInNvcnQiLCJqc29uIiwic3RhdHVzIiwiZXJyb3IiLCJtZXNzYWdlIiwidXBkYXRlU2luZ2xlIiwiZmluZEJ5SWQiLCJwYXJhbXMiLCJlbnRyeUlkIiwiYm9keSIsImhhc19yZWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsaUJBQU4sQ0FBd0I7QUFBQTtBQUFBLGFBb0VwQkMsa0JBcEVvQixHQW9FQyxNQUFNQyxNQUFOLElBQWdCO0FBQ2pDLGdCQUFJO0FBQ0Esc0JBQU1DLE9BQU8sTUFBTSxnQkFBTUMsT0FBTixDQUFjO0FBQzdCQyx5QkFBS0g7QUFEd0IsaUJBQWQsQ0FBbkI7O0FBSUEsc0JBQU1JLFVBQVUsd0JBQVNDLFFBQVQsQ0FBa0IsRUFBbEIsRUFBc0IsU0FBdEIsQ0FBaEI7QUFDQSxvQkFDSUosS0FBS0ssWUFBTCxLQUFzQkMsU0FBdEIsSUFDQSxzQkFBT04sS0FBS0ssWUFBWixFQUEwQkUsT0FBMUIsQ0FBa0NKLE9BQWxDLENBRkosRUFHRTtBQUNFO0FBQ0EsMkJBQU8sSUFBUDtBQUNIOztBQUVEO0FBQ0Esc0JBQU1LLFVBQVUsTUFBTSw2QkFBV0MsS0FBWCxDQUFpQlQsS0FBS1UsR0FBdEIsQ0FBdEI7O0FBRUFGLHdCQUFRRyxPQUFSLENBQWdCLE1BQU1DLEtBQU4sSUFBZTtBQUMzQiwwQkFBTSxLQUFLQyxZQUFMLENBQWtCZCxNQUFsQixFQUEwQmEsS0FBMUIsQ0FBTjtBQUNILGlCQUZEOztBQUlBO0FBQ0FaLHFCQUFLSyxZQUFMLEdBQW9CLElBQUlTLElBQUosRUFBcEI7QUFDQSxzQkFBTWQsS0FBS2UsSUFBTCxDQUFVQyxPQUFPO0FBQ25CLHdCQUFJQSxHQUFKLEVBQVM7QUFDTCw4QkFBTSxJQUFJQyxLQUFKLENBQVVELEdBQVYsQ0FBTjtBQUNIO0FBQ0osaUJBSkssQ0FBTjs7QUFNQSx1QkFBTyxJQUFQO0FBQ0gsYUE5QkQsQ0E4QkUsT0FBT0EsR0FBUCxFQUFZO0FBQ1Ysc0JBQU1BLEdBQU47QUFDSDtBQUNKLFNBdEdtQjs7QUFBQSxhQXdHcEJILFlBeEdvQixHQXdHTCxPQUFPZCxNQUFQLEVBQWVtQixRQUFmLEtBQTRCO0FBQ3ZDLGtCQUFNQyxRQUFRO0FBQ1ZDLHlCQUFTckIsTUFEQztBQUVWc0Isc0JBQU1ILFNBQVNHO0FBRkwsYUFBZDs7QUFLQSxnQkFBSTtBQUNBLHNCQUFNQyxhQUFhLE1BQU0sa0JBQVFyQixPQUFSLENBQWdCa0IsS0FBaEIsQ0FBekI7QUFDQSxvQkFBSSxDQUFDRyxVQUFELElBQWUsQ0FBQ0EsV0FBV3BCLEdBQS9CLEVBQW9DO0FBQ2hDLDBCQUFNcUIsT0FBTztBQUNUSCxpQ0FBU3JCLE1BREE7QUFFVHNCLDhCQUFNSCxTQUFTRyxJQUZOO0FBR1RHLCtCQUFPTixTQUFTTSxLQUhQO0FBSVRDLDhCQUFNUCxTQUFTTyxJQUpOO0FBS1RDLGlDQUFTUixTQUFTUyxNQUxUO0FBTVRDLGlDQUFTVixTQUFTVyxXQU5UO0FBT1RDLHlDQUFpQlosU0FBU2EsT0FQakI7QUFRVEMsc0NBQWNkLFNBQVNlO0FBUmQscUJBQWI7QUFVQSwwQkFBTUMsU0FBUyxzQkFBWVgsSUFBWixDQUFmO0FBQ0EsMkJBQU8sTUFBTVcsT0FBT25CLElBQVAsRUFBYjtBQUNIO0FBQ0QsdUJBQU8sSUFBUDtBQUNILGFBakJELENBaUJFLE9BQU9DLEdBQVAsRUFBWTtBQUNWLHNCQUFNQSxHQUFOO0FBQ0g7QUFDSixTQWxJbUI7QUFBQTs7QUFDcEIsVUFBTW1CLEdBQU4sQ0FBVUMsR0FBVixFQUFlQyxHQUFmLEVBQW9CO0FBQ2hCLFlBQUk7QUFDQSxrQkFBTSxLQUFLdkMsa0JBQUwsQ0FBd0JzQyxJQUFJakIsS0FBSixDQUFVcEIsTUFBbEMsQ0FBTjs7QUFFQSxnQkFBSW9CLFFBQVE7QUFDUkMseUJBQVNnQixJQUFJakIsS0FBSixDQUFVcEI7QUFEWCxhQUFaOztBQUlBLGdCQUFJcUMsSUFBSWpCLEtBQUosQ0FBVW1CLGNBQVYsQ0FBeUIsb0JBQXpCLENBQUosRUFBb0Q7QUFDaEQsb0JBQUlGLElBQUlqQixLQUFKLENBQVUsb0JBQVYsTUFBb0MsT0FBeEMsRUFBaUQ7QUFDN0M7QUFDQTtBQUNBO0FBQ0FBLDBCQUFNLFVBQU4sSUFBb0IsS0FBcEI7QUFDSDtBQUNKO0FBQ0Qsa0JBQU1YLFVBQVUsTUFBTSxrQkFBUStCLElBQVIsQ0FBYXBCLEtBQWIsRUFBb0JxQixJQUFwQixDQUF5QjtBQUMzQ1IsOEJBQWM7QUFENkIsYUFBekIsQ0FBdEI7O0FBSUEsbUJBQU9LLElBQUlJLElBQUosQ0FBUztBQUNaQyx3QkFBUSxTQURJO0FBRVpsQztBQUZZLGFBQVQsQ0FBUDtBQUlILFNBdkJELENBdUJFLE9BQU9RLEdBQVAsRUFBWTtBQUNWLG1CQUFPcUIsSUFBSUksSUFBSixDQUFTO0FBQ1pDLHdCQUFRLE9BREk7QUFFWkMsdUJBQ0kscUNBQ0EzQixJQUFJNEIsT0FESixHQUVBLFlBRkEsR0FHQVIsSUFBSWpCLEtBQUosQ0FBVXBCO0FBTkYsYUFBVCxDQUFQO0FBUUg7QUFDSjs7QUFFRDhDLGlCQUFhVCxHQUFiLEVBQWtCQyxHQUFsQixFQUF1QjtBQUNuQiwwQkFBUVMsUUFBUixDQUFpQlYsSUFBSVcsTUFBSixDQUFXQyxPQUE1QixFQUFxQyxDQUFDaEMsR0FBRCxFQUFNSixLQUFOLEtBQWdCO0FBQ2pELGdCQUFJSSxHQUFKLEVBQVM7QUFDTHFCLG9CQUFJSSxJQUFKLENBQVM7QUFDTEMsNEJBQVEsT0FESDtBQUVMQywyQkFDSSx1Q0FDQVAsSUFBSVcsTUFBSixDQUFXQztBQUpWLGlCQUFUO0FBTUgsYUFQRCxNQU9PO0FBQ0gsc0JBQU16QixPQUFPYSxJQUFJYSxJQUFqQjtBQUNBLG9CQUFJMUIsS0FBS2UsY0FBTCxDQUFvQixVQUFwQixDQUFKLEVBQXFDO0FBQ2pDMUIsMEJBQU1zQyxRQUFOLEdBQWlCM0IsS0FBSzJCLFFBQXRCO0FBQ0g7QUFDRHRDLHNCQUFNRyxJQUFOLENBQVcsQ0FBQ0MsR0FBRCxFQUFNRSxRQUFOLEtBQW1CO0FBQzFCLHdCQUFJRixHQUFKLEVBQVM7QUFDTHFCLDRCQUFJSSxJQUFKLENBQVM7QUFDTEMsb0NBQVEsT0FESDtBQUVMQyxtQ0FBTztBQUZGLHlCQUFUO0FBSUgscUJBTEQsTUFLTztBQUNITiw0QkFBSUksSUFBSixDQUFTO0FBQ0xDLG9DQUFRLFNBREg7QUFFTDlCLG1DQUFPTTtBQUZGLHlCQUFUO0FBSUg7QUFDSixpQkFaRDtBQWFIO0FBQ0osU0EzQkQ7QUE0Qkg7O0FBbEVtQjs7a0JBcUlULElBQUlyQixpQkFBSixFIiwiZmlsZSI6IkVudHJpZXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZWVkcGFyc2VyIGZyb20gXCJmZWVkcGFyc2VyLXByb21pc2VkXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuaW1wb3J0IEVudHJpZXMgZnJvbSBcIi4uL21vZGVscy9FbnRyaWVzLm1vZGVsXCI7XG5pbXBvcnQgRmVlZHMgZnJvbSBcIi4uL21vZGVscy9GZWVkcy5tb2RlbFwiO1xuXG5jbGFzcyBFbnRyaWVzQ29udHJvbGxlciB7XG4gICAgYXN5bmMgZ2V0KHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl91cGRhdGVGZWVkRW50cmllcyhyZXEucXVlcnkuZmVlZElkKTtcblxuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgIGZlZWRfaWQ6IHJlcS5xdWVyeS5mZWVkSWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChyZXEucXVlcnkuaGFzT3duUHJvcGVydHkoXCJzaG93RW50cmllc0hhc1JlYWRcIikpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxLnF1ZXJ5W1wic2hvd0VudHJpZXNIYXNSZWFkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBsb2dpYyBtaWdodCBzZWVtIG9kZCxcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHdlIG9ubHkgd2FudCB0byBhZGQgdGhpcyBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB3ZSBkbyBOT1Qgd2FudCB0byB2aWV3IHRoZSBoYXNfcmVhZCBlbnRyaWVzXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5W1wiaGFzX3JlYWRcIl0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgRW50cmllcy5maW5kKHF1ZXJ5KS5zb3J0KHtcbiAgICAgICAgICAgICAgICBwdWJsaXNoX2RhdGU6IFwiZGVzY1wiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIGVudHJpZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgZXJyb3I6XG4gICAgICAgICAgICAgICAgICAgIFwiVW5hYmxlIHRvIGdldCBlbnRyaWVzIGZvciBmZWVkLiBcIiArXG4gICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAgICAgXCIuIEZlZWQgSUQgXCIgK1xuICAgICAgICAgICAgICAgICAgICByZXEucXVlcnkuZmVlZElkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBFbnRyaWVzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZW50cnlJZCwgKGVyciwgZW50cnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVW5hYmxlIHRvIGZpbmQgdGhlIGVudHJ5IHdpdGggaWQ6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5wYXJhbXMuZW50cnlJZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVxLmJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoXCJoYXNfcmVhZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5oYXNfcmVhZCA9IGRhdGEuaGFzX3JlYWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVudHJ5LnNhdmUoKGVyciwgbmV3RW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBzYXZlIHRoZSB1cGRhdGVkIGVudHJ5LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5OiBuZXdFbnRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUZlZWRFbnRyaWVzID0gYXN5bmMgZmVlZElkID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGZlZWQgPSBhd2FpdCBGZWVkcy5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBfaWQ6IGZlZWRJZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVBZ28gPSBtb21lbnQoKS5zdWJ0cmFjdCgxNSwgXCJtaW51dGVzXCIpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGZlZWQubGFzdF91cGRhdGVkICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBtb21lbnQoZmVlZC5sYXN0X3VwZGF0ZWQpLmlzQWZ0ZXIodGltZUFnbylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBmZWVkIHdhcyByZWNlbnRseSB1cGRhdGVkLCBzbyBubyBuZWVkIHRvIHBhcnNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEdldCBhbmQgcGFyc2UgdGhlIFJTUyBmZWVkXG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgZmVlZHBhcnNlci5wYXJzZShmZWVkLnVybCk7XG5cbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChhc3luYyBlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fYWRkTmV3RW50cnkoZmVlZElkLCBlbnRyeSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lIG9mIHVwZGF0ZVxuICAgICAgICAgICAgZmVlZC5sYXN0X3VwZGF0ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgYXdhaXQgZmVlZC5zYXZlKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIF9hZGROZXdFbnRyeSA9IGFzeW5jIChmZWVkSWQsIG5ld0VudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgZmVlZF9pZDogZmVlZElkLFxuICAgICAgICAgICAgZ3VpZDogbmV3RW50cnkuZ3VpZFxuICAgICAgICB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZEVudHJ5ID0gYXdhaXQgRW50cmllcy5maW5kT25lKHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmICghZm91bmRFbnRyeSB8fCAhZm91bmRFbnRyeS5faWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBmZWVkX2lkOiBmZWVkSWQsXG4gICAgICAgICAgICAgICAgICAgIGd1aWQ6IG5ld0VudHJ5Lmd1aWQsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBuZXdFbnRyeS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogbmV3RW50cnkubGluayxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcjogbmV3RW50cnkuYXV0aG9yLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdFbnRyeS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY29udGVudF9zbmlwcGV0OiBuZXdFbnRyeS5zdW1tYXJ5LFxuICAgICAgICAgICAgICAgICAgICBwdWJsaXNoX2RhdGU6IG5ld0VudHJ5LnB1YkRhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc2VydCA9IG5ldyBFbnRyaWVzKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBpbnNlcnQuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEVudHJpZXNDb250cm9sbGVyKCk7XG4iXX0=