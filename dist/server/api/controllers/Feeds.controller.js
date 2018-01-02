"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entries = require("../models/Entries.model");

var _Entries2 = _interopRequireDefault(_Entries);

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeedsController = function () {
    function FeedsController() {
        _classCallCheck(this, FeedsController);
    }

    _createClass(FeedsController, [{
        key: "get_all",
        value: function get_all(req, res) {
            _Feeds2.default.find({}, function (err, feeds) {
                if (err) {
                    res.json({
                        status: "error",
                        error: err
                    });
                } else {
                    res.json({ status: "success", feeds: feeds });
                }
            }).sort({ title: "asc" });
        }
    }, {
        key: "add",
        value: function add(req, res) {
            var newFeed = new _Feeds2.default(req.body);
            newFeed.save(function (err, feed) {
                if (err) {
                    res.json({
                        status: "error",
                        error: err
                    });
                } else {
                    var data = {
                        status: "success",
                        feedInfo: feed
                    };
                    res.json(data);
                }
            });
        }
    }, {
        key: "get_single",
        value: function get_single(req, res) {
            _Feeds2.default.findById(req.params.feedId, function (err, feed) {
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
    }, {
        key: "delete_single",
        value: function delete_single(req, res) {
            _Entries2.default.remove({ feed_id: req.params.feedId }, function (err) {
                // TODO: Add err handler?
                if (err) {
                    return res.json({
                        status: "error",
                        error: "Unable to remove entries for feed."
                    });
                }

                _Feeds2.default.remove({ _id: req.params.feedId }, function (err) {
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
    }, {
        key: "update_single",
        value: function update_single(req, res) {
            _Feeds2.default.findById(req.params.feedId, function (err, feed) {
                if (err || feed.length === 0) {
                    res.json({
                        status: "error",
                        error: "Unable to find that feed to update."
                    });
                } else {
                    feed.title = req.body.title;
                    feed.folder_id = req.body.folder_id;
                    feed.save(function (err, feedInfo) {
                        if (err) {
                            res.json({
                                status: "error",
                                error: "Unable to save the new feed information."
                            });
                        } else {
                            var data = {
                                status: "success",
                                feedInfo: feedInfo
                            };
                            res.json(data);
                        }
                    });
                }
            });
        }
    }]);

    return FeedsController;
}();

exports.default = new FeedsController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZlZWRzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiRmVlZHNDb250cm9sbGVyIiwicmVxIiwicmVzIiwiZmluZCIsImVyciIsImZlZWRzIiwianNvbiIsInN0YXR1cyIsImVycm9yIiwic29ydCIsInRpdGxlIiwibmV3RmVlZCIsImJvZHkiLCJzYXZlIiwiZmVlZCIsImRhdGEiLCJmZWVkSW5mbyIsImZpbmRCeUlkIiwicGFyYW1zIiwiZmVlZElkIiwicmVtb3ZlIiwiZmVlZF9pZCIsIl9pZCIsImxlbmd0aCIsImZvbGRlcl9pZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxlOzs7Ozs7O2dDQUNNQyxHLEVBQUtDLEcsRUFBSztBQUNkLDRCQUFNQyxJQUFOLENBQVcsRUFBWCxFQUFlLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUMzQixvQkFBSUQsR0FBSixFQUFTO0FBQ0xGLHdCQUFJSSxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsT0FESDtBQUVMQywrQkFBT0o7QUFGRixxQkFBVDtBQUlILGlCQUxELE1BS087QUFDSEYsd0JBQUlJLElBQUosQ0FBUyxFQUFFQyxRQUFRLFNBQVYsRUFBcUJGLFlBQXJCLEVBQVQ7QUFDSDtBQUNKLGFBVEQsRUFTR0ksSUFUSCxDQVNRLEVBQUVDLE9BQU8sS0FBVCxFQVRSO0FBVUg7Ozs0QkFFR1QsRyxFQUFLQyxHLEVBQUs7QUFDVixnQkFBSVMsVUFBVSxvQkFBVVYsSUFBSVcsSUFBZCxDQUFkO0FBQ0FELG9CQUFRRSxJQUFSLENBQWEsVUFBQ1QsR0FBRCxFQUFNVSxJQUFOLEVBQWU7QUFDeEIsb0JBQUlWLEdBQUosRUFBUztBQUNMRix3QkFBSUksSUFBSixDQUFTO0FBQ0xDLGdDQUFRLE9BREg7QUFFTEMsK0JBQU9KO0FBRkYscUJBQVQ7QUFJSCxpQkFMRCxNQUtPO0FBQ0gsd0JBQU1XLE9BQU87QUFDVFIsZ0NBQVEsU0FEQztBQUVUUyxrQ0FBVUY7QUFGRCxxQkFBYjtBQUlBWix3QkFBSUksSUFBSixDQUFTUyxJQUFUO0FBQ0g7QUFDSixhQWJEO0FBY0g7OzttQ0FFVWQsRyxFQUFLQyxHLEVBQUs7QUFDakIsNEJBQU1lLFFBQU4sQ0FBZWhCLElBQUlpQixNQUFKLENBQVdDLE1BQTFCLEVBQWtDLFVBQUNmLEdBQUQsRUFBTVUsSUFBTixFQUFlO0FBQzdDLG9CQUFJVixHQUFKLEVBQVM7QUFDTEYsd0JBQUlJLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLCtCQUFPO0FBRkYscUJBQVQ7QUFJSCxpQkFMRCxNQUtPO0FBQ0hOLHdCQUFJSSxJQUFKLENBQVNRLElBQVQ7QUFDSDtBQUNKLGFBVEQ7QUFVSDs7O3NDQUVhYixHLEVBQUtDLEcsRUFBSztBQUNwQiw4QkFBUWtCLE1BQVIsQ0FBZSxFQUFFQyxTQUFTcEIsSUFBSWlCLE1BQUosQ0FBV0MsTUFBdEIsRUFBZixFQUErQyxlQUFPO0FBQ2xEO0FBQ0Esb0JBQUlmLEdBQUosRUFBUztBQUNMLDJCQUFPRixJQUFJSSxJQUFKLENBQVM7QUFDWkMsZ0NBQVEsT0FESTtBQUVaQywrQkFBTztBQUZLLHFCQUFULENBQVA7QUFJSDs7QUFFRCxnQ0FBTVksTUFBTixDQUFhLEVBQUVFLEtBQUtyQixJQUFJaUIsTUFBSixDQUFXQyxNQUFsQixFQUFiLEVBQXlDLGVBQU87QUFDNUMsd0JBQUlmLEdBQUosRUFBUztBQUNMLCtCQUFPRixJQUFJSSxJQUFKLENBQVM7QUFDWkMsb0NBQVEsT0FESTtBQUVaQyxtQ0FBTztBQUZLLHlCQUFULENBQVA7QUFJSDtBQUNETix3QkFBSUksSUFBSixDQUFTLEVBQUVDLFFBQVEsU0FBVixFQUFUO0FBQ0gsaUJBUkQ7QUFTSCxhQWxCRDtBQW1CSDs7O3NDQUVhTixHLEVBQUtDLEcsRUFBSztBQUNwQiw0QkFBTWUsUUFBTixDQUFlaEIsSUFBSWlCLE1BQUosQ0FBV0MsTUFBMUIsRUFBa0MsVUFBQ2YsR0FBRCxFQUFNVSxJQUFOLEVBQWU7QUFDN0Msb0JBQUlWLE9BQU9VLEtBQUtTLE1BQUwsS0FBZ0IsQ0FBM0IsRUFBOEI7QUFDMUJyQix3QkFBSUksSUFBSixDQUFTO0FBQ0xDLGdDQUFRLE9BREg7QUFFTEMsK0JBQU87QUFGRixxQkFBVDtBQUlILGlCQUxELE1BS087QUFDSE0seUJBQUtKLEtBQUwsR0FBYVQsSUFBSVcsSUFBSixDQUFTRixLQUF0QjtBQUNBSSx5QkFBS1UsU0FBTCxHQUFpQnZCLElBQUlXLElBQUosQ0FBU1ksU0FBMUI7QUFDQVYseUJBQUtELElBQUwsQ0FBVSxVQUFDVCxHQUFELEVBQU1ZLFFBQU4sRUFBbUI7QUFDekIsNEJBQUlaLEdBQUosRUFBUztBQUNMRixnQ0FBSUksSUFBSixDQUFTO0FBQ0xDLHdDQUFRLE9BREg7QUFFTEMsdUNBQU87QUFGRiw2QkFBVDtBQUlILHlCQUxELE1BS087QUFDSCxnQ0FBTU8sT0FBTztBQUNUUix3Q0FBUSxTQURDO0FBRVRTO0FBRlMsNkJBQWI7QUFJQWQsZ0NBQUlJLElBQUosQ0FBU1MsSUFBVDtBQUNIO0FBQ0oscUJBYkQ7QUFjSDtBQUNKLGFBeEJEO0FBeUJIOzs7Ozs7a0JBR1UsSUFBSWYsZUFBSixFIiwiZmlsZSI6IkZlZWRzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW50cmllcyBmcm9tIFwiLi4vbW9kZWxzL0VudHJpZXMubW9kZWxcIjtcbmltcG9ydCBGZWVkcyBmcm9tIFwiLi4vbW9kZWxzL0ZlZWRzLm1vZGVsXCI7XG5cbmNsYXNzIEZlZWRzQ29udHJvbGxlciB7XG4gICAgZ2V0X2FsbChyZXEsIHJlcykge1xuICAgICAgICBGZWVkcy5maW5kKHt9LCAoZXJyLCBmZWVkcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oeyBzdGF0dXM6IFwic3VjY2Vzc1wiLCBmZWVkcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc29ydCh7IHRpdGxlOiBcImFzY1wiIH0pO1xuICAgIH1cblxuICAgIGFkZChyZXEsIHJlcykge1xuICAgICAgICBsZXQgbmV3RmVlZCA9IG5ldyBGZWVkcyhyZXEuYm9keSk7XG4gICAgICAgIG5ld0ZlZWQuc2F2ZSgoZXJyLCBmZWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBmZWVkSW5mbzogZmVlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldF9zaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgRmVlZHMuZmluZEJ5SWQocmVxLnBhcmFtcy5mZWVkSWQsIChlcnIsIGZlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gZ2V0IHNpbmdsZSBmZWVkLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKGZlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVfc2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEVudHJpZXMucmVtb3ZlKHsgZmVlZF9pZDogcmVxLnBhcmFtcy5mZWVkSWQgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHJlbW92ZSBlbnRyaWVzIGZvciBmZWVkLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZlZWRzLnJlbW92ZSh7IF9pZDogcmVxLnBhcmFtcy5mZWVkSWQgfSwgZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byByZW1vdmUgdGhlIGZlZWQuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcy5qc29uKHsgc3RhdHVzOiBcInN1Y2Nlc3NcIiB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVfc2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEZlZWRzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZmVlZElkLCAoZXJyLCBmZWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyIHx8IGZlZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIGZpbmQgdGhhdCBmZWVkIHRvIHVwZGF0ZS5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmZWVkLnRpdGxlID0gcmVxLmJvZHkudGl0bGU7XG4gICAgICAgICAgICAgICAgZmVlZC5mb2xkZXJfaWQgPSByZXEuYm9keS5mb2xkZXJfaWQ7XG4gICAgICAgICAgICAgICAgZmVlZC5zYXZlKChlcnIsIGZlZWRJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gc2F2ZSB0aGUgbmV3IGZlZWQgaW5mb3JtYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRJbmZvXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRmVlZHNDb250cm9sbGVyKCk7XG4iXX0=