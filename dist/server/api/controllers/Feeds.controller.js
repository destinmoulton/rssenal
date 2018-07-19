"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entries = require("../models/Entries.model");

var _Entries2 = _interopRequireDefault(_Entries);

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FeedsController {
    get_all(req, res) {
        _Feeds2.default.find({}, (err, feeds) => {
            if (err) {
                res.json({
                    status: "error",
                    error: err
                });
            } else {
                res.json({ status: "success", feeds });
            }
        }).sort({ title: "asc" });
    }

    add(req, res) {
        let newFeed = new _Feeds2.default(req.body);
        newFeed.save((err, feed) => {
            if (err) {
                res.json({
                    status: "error",
                    error: err
                });
            } else {
                const data = {
                    status: "success",
                    feedInfo: feed
                };
                res.json(data);
            }
        });
    }

    get_single(req, res) {
        _Feeds2.default.findById(req.params.feedId, (err, feed) => {
            if (err) {
                res.json({
                    status: "error",
                    error: "Unable to get single feed."
                });
            } else {
                res.json(feed);
            }
        });
    }

    delete_single(req, res) {
        _Entries2.default.remove({ feed_id: req.params.feedId }, err => {
            // TODO: Add err handler?
            if (err) {
                return res.json({
                    status: "error",
                    error: "Unable to remove entries for feed."
                });
            }

            _Feeds2.default.remove({ _id: req.params.feedId }, err => {
                if (err) {
                    return res.json({
                        status: "error",
                        error: "Unable to remove the feed."
                    });
                }
                res.json({ status: "success" });
            });
        });
    }

    update_single(req, res) {
        _Feeds2.default.findById(req.params.feedId, (err, feed) => {
            if (err || feed.length === 0) {
                res.json({
                    status: "error",
                    error: "Unable to find that feed to update."
                });
            } else {
                feed.title = req.body.title;
                feed.folder_id = req.body.folder_id;
                feed.save((err, feedInfo) => {
                    if (err) {
                        res.json({
                            status: "error",
                            error: "Unable to save the new feed information."
                        });
                    } else {
                        const data = {
                            status: "success",
                            feedInfo
                        };
                        res.json(data);
                    }
                });
            }
        });
    }
}

exports.default = new FeedsController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZlZWRzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiRmVlZHNDb250cm9sbGVyIiwiZ2V0X2FsbCIsInJlcSIsInJlcyIsImZpbmQiLCJlcnIiLCJmZWVkcyIsImpzb24iLCJzdGF0dXMiLCJlcnJvciIsInNvcnQiLCJ0aXRsZSIsImFkZCIsIm5ld0ZlZWQiLCJib2R5Iiwic2F2ZSIsImZlZWQiLCJkYXRhIiwiZmVlZEluZm8iLCJnZXRfc2luZ2xlIiwiZmluZEJ5SWQiLCJwYXJhbXMiLCJmZWVkSWQiLCJkZWxldGVfc2luZ2xlIiwicmVtb3ZlIiwiZmVlZF9pZCIsIl9pZCIsInVwZGF0ZV9zaW5nbGUiLCJsZW5ndGgiLCJmb2xkZXJfaWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbEJDLFlBQVFDLEdBQVIsRUFBYUMsR0FBYixFQUFrQjtBQUNkLHdCQUFNQyxJQUFOLENBQVcsRUFBWCxFQUFlLENBQUNDLEdBQUQsRUFBTUMsS0FBTixLQUFnQjtBQUMzQixnQkFBSUQsR0FBSixFQUFTO0FBQ0xGLG9CQUFJSSxJQUFKLENBQVM7QUFDTEMsNEJBQVEsT0FESDtBQUVMQywyQkFBT0o7QUFGRixpQkFBVDtBQUlILGFBTEQsTUFLTztBQUNIRixvQkFBSUksSUFBSixDQUFTLEVBQUVDLFFBQVEsU0FBVixFQUFxQkYsS0FBckIsRUFBVDtBQUNIO0FBQ0osU0FURCxFQVNHSSxJQVRILENBU1EsRUFBRUMsT0FBTyxLQUFULEVBVFI7QUFVSDs7QUFFREMsUUFBSVYsR0FBSixFQUFTQyxHQUFULEVBQWM7QUFDVixZQUFJVSxVQUFVLG9CQUFVWCxJQUFJWSxJQUFkLENBQWQ7QUFDQUQsZ0JBQVFFLElBQVIsQ0FBYSxDQUFDVixHQUFELEVBQU1XLElBQU4sS0FBZTtBQUN4QixnQkFBSVgsR0FBSixFQUFTO0FBQ0xGLG9CQUFJSSxJQUFKLENBQVM7QUFDTEMsNEJBQVEsT0FESDtBQUVMQywyQkFBT0o7QUFGRixpQkFBVDtBQUlILGFBTEQsTUFLTztBQUNILHNCQUFNWSxPQUFPO0FBQ1RULDRCQUFRLFNBREM7QUFFVFUsOEJBQVVGO0FBRkQsaUJBQWI7QUFJQWIsb0JBQUlJLElBQUosQ0FBU1UsSUFBVDtBQUNIO0FBQ0osU0FiRDtBQWNIOztBQUVERSxlQUFXakIsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUI7QUFDakIsd0JBQU1pQixRQUFOLENBQWVsQixJQUFJbUIsTUFBSixDQUFXQyxNQUExQixFQUFrQyxDQUFDakIsR0FBRCxFQUFNVyxJQUFOLEtBQWU7QUFDN0MsZ0JBQUlYLEdBQUosRUFBUztBQUNMRixvQkFBSUksSUFBSixDQUFTO0FBQ0xDLDRCQUFRLE9BREg7QUFFTEMsMkJBQU87QUFGRixpQkFBVDtBQUlILGFBTEQsTUFLTztBQUNITixvQkFBSUksSUFBSixDQUFTUyxJQUFUO0FBQ0g7QUFDSixTQVREO0FBVUg7O0FBRURPLGtCQUFjckIsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0I7QUFDcEIsMEJBQVFxQixNQUFSLENBQWUsRUFBRUMsU0FBU3ZCLElBQUltQixNQUFKLENBQVdDLE1BQXRCLEVBQWYsRUFBK0NqQixPQUFPO0FBQ2xEO0FBQ0EsZ0JBQUlBLEdBQUosRUFBUztBQUNMLHVCQUFPRixJQUFJSSxJQUFKLENBQVM7QUFDWkMsNEJBQVEsT0FESTtBQUVaQywyQkFBTztBQUZLLGlCQUFULENBQVA7QUFJSDs7QUFFRCw0QkFBTWUsTUFBTixDQUFhLEVBQUVFLEtBQUt4QixJQUFJbUIsTUFBSixDQUFXQyxNQUFsQixFQUFiLEVBQXlDakIsT0FBTztBQUM1QyxvQkFBSUEsR0FBSixFQUFTO0FBQ0wsMkJBQU9GLElBQUlJLElBQUosQ0FBUztBQUNaQyxnQ0FBUSxPQURJO0FBRVpDLCtCQUFPO0FBRksscUJBQVQsQ0FBUDtBQUlIO0FBQ0ROLG9CQUFJSSxJQUFKLENBQVMsRUFBRUMsUUFBUSxTQUFWLEVBQVQ7QUFDSCxhQVJEO0FBU0gsU0FsQkQ7QUFtQkg7O0FBRURtQixrQkFBY3pCLEdBQWQsRUFBbUJDLEdBQW5CLEVBQXdCO0FBQ3BCLHdCQUFNaUIsUUFBTixDQUFlbEIsSUFBSW1CLE1BQUosQ0FBV0MsTUFBMUIsRUFBa0MsQ0FBQ2pCLEdBQUQsRUFBTVcsSUFBTixLQUFlO0FBQzdDLGdCQUFJWCxPQUFPVyxLQUFLWSxNQUFMLEtBQWdCLENBQTNCLEVBQThCO0FBQzFCekIsb0JBQUlJLElBQUosQ0FBUztBQUNMQyw0QkFBUSxPQURIO0FBRUxDLDJCQUFPO0FBRkYsaUJBQVQ7QUFJSCxhQUxELE1BS087QUFDSE8scUJBQUtMLEtBQUwsR0FBYVQsSUFBSVksSUFBSixDQUFTSCxLQUF0QjtBQUNBSyxxQkFBS2EsU0FBTCxHQUFpQjNCLElBQUlZLElBQUosQ0FBU2UsU0FBMUI7QUFDQWIscUJBQUtELElBQUwsQ0FBVSxDQUFDVixHQUFELEVBQU1hLFFBQU4sS0FBbUI7QUFDekIsd0JBQUliLEdBQUosRUFBUztBQUNMRiw0QkFBSUksSUFBSixDQUFTO0FBQ0xDLG9DQUFRLE9BREg7QUFFTEMsbUNBQU87QUFGRix5QkFBVDtBQUlILHFCQUxELE1BS087QUFDSCw4QkFBTVEsT0FBTztBQUNUVCxvQ0FBUSxTQURDO0FBRVRVO0FBRlMseUJBQWI7QUFJQWYsNEJBQUlJLElBQUosQ0FBU1UsSUFBVDtBQUNIO0FBQ0osaUJBYkQ7QUFjSDtBQUNKLFNBeEJEO0FBeUJIO0FBN0ZpQjs7a0JBZ0dQLElBQUlqQixlQUFKLEUiLCJmaWxlIjoiRmVlZHMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRyaWVzIGZyb20gXCIuLi9tb2RlbHMvRW50cmllcy5tb2RlbFwiO1xuaW1wb3J0IEZlZWRzIGZyb20gXCIuLi9tb2RlbHMvRmVlZHMubW9kZWxcIjtcblxuY2xhc3MgRmVlZHNDb250cm9sbGVyIHtcbiAgICBnZXRfYWxsKHJlcSwgcmVzKSB7XG4gICAgICAgIEZlZWRzLmZpbmQoe30sIChlcnIsIGZlZWRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7IHN0YXR1czogXCJzdWNjZXNzXCIsIGZlZWRzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5zb3J0KHsgdGl0bGU6IFwiYXNjXCIgfSk7XG4gICAgfVxuXG4gICAgYWRkKHJlcSwgcmVzKSB7XG4gICAgICAgIGxldCBuZXdGZWVkID0gbmV3IEZlZWRzKHJlcS5ib2R5KTtcbiAgICAgICAgbmV3RmVlZC5zYXZlKChlcnIsIGZlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIGZlZWRJbmZvOiBmZWVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXMuanNvbihkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0X3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBGZWVkcy5maW5kQnlJZChyZXEucGFyYW1zLmZlZWRJZCwgKGVyciwgZmVlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBnZXQgc2luZ2xlIGZlZWQuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oZmVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZV9zaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgRW50cmllcy5yZW1vdmUoeyBmZWVkX2lkOiByZXEucGFyYW1zLmZlZWRJZCB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETzogQWRkIGVyciBoYW5kbGVyP1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gcmVtb3ZlIGVudHJpZXMgZm9yIGZlZWQuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRmVlZHMucmVtb3ZlKHsgX2lkOiByZXEucGFyYW1zLmZlZWRJZCB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHJlbW92ZSB0aGUgZmVlZC5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oeyBzdGF0dXM6IFwic3VjY2Vzc1wiIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZV9zaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgRmVlZHMuZmluZEJ5SWQocmVxLnBhcmFtcy5mZWVkSWQsIChlcnIsIGZlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIgfHwgZmVlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gZmluZCB0aGF0IGZlZWQgdG8gdXBkYXRlLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZlZWQudGl0bGUgPSByZXEuYm9keS50aXRsZTtcbiAgICAgICAgICAgICAgICBmZWVkLmZvbGRlcl9pZCA9IHJlcS5ib2R5LmZvbGRlcl9pZDtcbiAgICAgICAgICAgICAgICBmZWVkLnNhdmUoKGVyciwgZmVlZEluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBzYXZlIHRoZSBuZXcgZmVlZCBpbmZvcm1hdGlvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlZEluZm9cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbihkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBGZWVkc0NvbnRyb2xsZXIoKTtcbiJdfQ==