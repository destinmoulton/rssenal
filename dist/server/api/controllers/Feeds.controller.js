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
            }).sort({ title: 'asc' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZlZWRzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiRmVlZHNDb250cm9sbGVyIiwicmVxIiwicmVzIiwiZmluZCIsImVyciIsImZlZWRzIiwianNvbiIsInN0YXR1cyIsImVycm9yIiwic29ydCIsInRpdGxlIiwibmV3RmVlZCIsImJvZHkiLCJzYXZlIiwiZmVlZCIsImRhdGEiLCJmZWVkSW5mbyIsImZpbmRCeUlkIiwicGFyYW1zIiwiZmVlZElkIiwicmVtb3ZlIiwiZmVlZF9pZCIsIl9pZCIsImxlbmd0aCIsImZvbGRlcl9pZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxlOzs7Ozs7O2dDQUNNQyxHLEVBQUtDLEcsRUFBSTtBQUNiLDRCQUNLQyxJQURMLENBQ1UsRUFEVixFQUNjLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFjO0FBQ3BCLG9CQUFHRCxHQUFILEVBQVE7QUFDSkYsd0JBQUlJLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLCtCQUFPSjtBQUZGLHFCQUFUO0FBSUgsaUJBTEQsTUFLTztBQUNIRix3QkFBSUksSUFBSixDQUFTLEVBQUNDLFFBQVEsU0FBVCxFQUFvQkYsWUFBcEIsRUFBVDtBQUNIO0FBQ0osYUFWTCxFQVdLSSxJQVhMLENBV1UsRUFBQ0MsT0FBTyxLQUFSLEVBWFY7QUFZSDs7OzRCQUVHVCxHLEVBQUtDLEcsRUFBSTtBQUNULGdCQUFJUyxVQUFVLG9CQUFVVixJQUFJVyxJQUFkLENBQWQ7QUFDQUQsb0JBQVFFLElBQVIsQ0FBYSxVQUFDVCxHQUFELEVBQU1VLElBQU4sRUFBYTtBQUN0QixvQkFBR1YsR0FBSCxFQUFRO0FBQ0pGLHdCQUFJSSxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsT0FESDtBQUVMQywrQkFBT0o7QUFGRixxQkFBVDtBQUlILGlCQUxELE1BS087QUFDSCx3QkFBTVcsT0FBTztBQUNUUixnQ0FBUSxTQURDO0FBRVRTLGtDQUFVRjtBQUZELHFCQUFiO0FBSUFaLHdCQUFJSSxJQUFKLENBQVNTLElBQVQ7QUFDSDtBQUNKLGFBYkQ7QUFjSDs7O21DQUVVZCxHLEVBQUtDLEcsRUFBSTtBQUNoQiw0QkFBTWUsUUFBTixDQUFlaEIsSUFBSWlCLE1BQUosQ0FBV0MsTUFBMUIsRUFBa0MsVUFBQ2YsR0FBRCxFQUFNVSxJQUFOLEVBQWE7QUFDM0Msb0JBQUdWLEdBQUgsRUFBTztBQUNIRix3QkFBSUksSUFBSixDQUFTO0FBQ0xDLGdDQUFRLE9BREg7QUFFTEMsK0JBQU87QUFGRixxQkFBVDtBQUlILGlCQUxELE1BS087QUFDSE4sd0JBQUlJLElBQUosQ0FBU1EsSUFBVDtBQUNIO0FBQ0osYUFURDtBQVVIOzs7c0NBRWFiLEcsRUFBS0MsRyxFQUFJO0FBQ25CLDhCQUFRa0IsTUFBUixDQUFlLEVBQUNDLFNBQVNwQixJQUFJaUIsTUFBSixDQUFXQyxNQUFyQixFQUFmLEVBQTZDLFVBQUNmLEdBQUQsRUFBTztBQUNoRDtBQUNBLG9CQUFHQSxHQUFILEVBQU87QUFDSCwyQkFBT0YsSUFBSUksSUFBSixDQUFTO0FBQ1pDLGdDQUFRLE9BREk7QUFFWkMsK0JBQU87QUFGSyxxQkFBVCxDQUFQO0FBSUg7O0FBRUQsZ0NBQU1ZLE1BQU4sQ0FBYSxFQUFDRSxLQUFLckIsSUFBSWlCLE1BQUosQ0FBV0MsTUFBakIsRUFBYixFQUF1QyxVQUFDZixHQUFELEVBQU87QUFDMUMsd0JBQUdBLEdBQUgsRUFBTztBQUNILCtCQUFPRixJQUFJSSxJQUFKLENBQVM7QUFDWkMsb0NBQVEsT0FESTtBQUVaQyxtQ0FBTztBQUZLLHlCQUFULENBQVA7QUFJSDtBQUNETix3QkFBSUksSUFBSixDQUFTLEVBQUNDLFFBQVEsU0FBVCxFQUFUO0FBQ0gsaUJBUkQ7QUFTSCxhQWxCRDtBQW9CSDs7O3NDQUVhTixHLEVBQUtDLEcsRUFBSTtBQUNuQiw0QkFBTWUsUUFBTixDQUFlaEIsSUFBSWlCLE1BQUosQ0FBV0MsTUFBMUIsRUFBa0MsVUFBQ2YsR0FBRCxFQUFNVSxJQUFOLEVBQWE7QUFDM0Msb0JBQUdWLE9BQU9VLEtBQUtTLE1BQUwsS0FBYyxDQUF4QixFQUEyQjtBQUN2QnJCLHdCQUFJSSxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsT0FESDtBQUVMQywrQkFBTztBQUZGLHFCQUFUO0FBSUgsaUJBTEQsTUFLTztBQUNITSx5QkFBS0osS0FBTCxHQUFhVCxJQUFJVyxJQUFKLENBQVNGLEtBQXRCO0FBQ0FJLHlCQUFLVSxTQUFMLEdBQWlCdkIsSUFBSVcsSUFBSixDQUFTWSxTQUExQjtBQUNBVix5QkFBS0QsSUFBTCxDQUFVLFVBQUNULEdBQUQsRUFBTVksUUFBTixFQUFpQjtBQUN2Qiw0QkFBR1osR0FBSCxFQUFRO0FBQ0pGLGdDQUFJSSxJQUFKLENBQVM7QUFDTEMsd0NBQVEsT0FESDtBQUVMQyx1Q0FBTztBQUZGLDZCQUFUO0FBSUgseUJBTEQsTUFLTztBQUNILGdDQUFNTyxPQUFPO0FBQ1RSLHdDQUFRLFNBREM7QUFFVFM7QUFGUyw2QkFBYjtBQUlBZCxnQ0FBSUksSUFBSixDQUFTUyxJQUFUO0FBQ0g7QUFDSixxQkFiRDtBQWVIO0FBQ0osYUF6QkQ7QUEwQkg7Ozs7OztrQkFHVSxJQUFJZixlQUFKLEUiLCJmaWxlIjoiRmVlZHMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRyaWVzIGZyb20gXCIuLi9tb2RlbHMvRW50cmllcy5tb2RlbFwiO1xuaW1wb3J0IEZlZWRzIGZyb20gXCIuLi9tb2RlbHMvRmVlZHMubW9kZWxcIjtcblxuY2xhc3MgRmVlZHNDb250cm9sbGVyIHtcbiAgICBnZXRfYWxsKHJlcSwgcmVzKXtcbiAgICAgICAgRmVlZHNcbiAgICAgICAgICAgIC5maW5kKHt9LCAoZXJyLCBmZWVkcyk9PntcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtzdGF0dXM6IFwic3VjY2Vzc1wiLCBmZWVkc30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc29ydCh7dGl0bGU6ICdhc2MnfSk7XG4gICAgfVxuXG4gICAgYWRkKHJlcSwgcmVzKXtcbiAgICAgICAgbGV0IG5ld0ZlZWQgPSBuZXcgRmVlZHMocmVxLmJvZHkpO1xuICAgICAgICBuZXdGZWVkLnNhdmUoKGVyciwgZmVlZCk9PntcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgZmVlZEluZm86IGZlZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRfc2luZ2xlKHJlcSwgcmVzKXtcbiAgICAgICAgRmVlZHMuZmluZEJ5SWQocmVxLnBhcmFtcy5mZWVkSWQsIChlcnIsIGZlZWQpPT57XG4gICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBnZXQgc2luZ2xlIGZlZWQuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oZmVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZV9zaW5nbGUocmVxLCByZXMpe1xuICAgICAgICBFbnRyaWVzLnJlbW92ZSh7ZmVlZF9pZDogcmVxLnBhcmFtcy5mZWVkSWR9LCAoZXJyKT0+e1xuICAgICAgICAgICAgLy8gVE9ETzogQWRkIGVyciBoYW5kbGVyP1xuICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHJlbW92ZSBlbnRyaWVzIGZvciBmZWVkLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZlZWRzLnJlbW92ZSh7X2lkOiByZXEucGFyYW1zLmZlZWRJZH0sIChlcnIpPT57XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIHJlbW92ZSB0aGUgZmVlZC5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe3N0YXR1czogXCJzdWNjZXNzXCJ9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVfc2luZ2xlKHJlcSwgcmVzKXtcbiAgICAgICAgRmVlZHMuZmluZEJ5SWQocmVxLnBhcmFtcy5mZWVkSWQsIChlcnIsIGZlZWQpPT57XG4gICAgICAgICAgICBpZihlcnIgfHwgZmVlZC5sZW5ndGg9PT0wKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIGZpbmQgdGhhdCBmZWVkIHRvIHVwZGF0ZS5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmZWVkLnRpdGxlID0gcmVxLmJvZHkudGl0bGU7XG4gICAgICAgICAgICAgICAgZmVlZC5mb2xkZXJfaWQgPSByZXEuYm9keS5mb2xkZXJfaWQ7XG4gICAgICAgICAgICAgICAgZmVlZC5zYXZlKChlcnIsIGZlZWRJbmZvKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJVbmFibGUgdG8gc2F2ZSB0aGUgbmV3IGZlZWQgaW5mb3JtYXRpb24uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRJbmZvXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRmVlZHNDb250cm9sbGVyKCk7Il19