"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _feedparserPromised = require("feedparser-promised");

var _feedparserPromised2 = _interopRequireDefault(_feedparserPromised);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ValidateFeedURL {
    validate_single(req, res) {
        // Validate that the url is accessible
        const data = req.body;
        return _feedparserPromised2.default.parse(data.feedURL).then(articles => {
            if (articles.length > 0) {
                return res.json({
                    status: "success",
                    feedInfo: articles[0].meta
                });
            }
        }).catch(err => {
            return res.json({ status: "error", error: err });
        });
    }
}

exports.default = new ValidateFeedURL();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL1ZhbGlkYXRlRmVlZFVSTC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRlRmVlZFVSTCIsInZhbGlkYXRlX3NpbmdsZSIsInJlcSIsInJlcyIsImRhdGEiLCJib2R5IiwicGFyc2UiLCJmZWVkVVJMIiwidGhlbiIsImFydGljbGVzIiwibGVuZ3RoIiwianNvbiIsInN0YXR1cyIsImZlZWRJbmZvIiwibWV0YSIsImNhdGNoIiwiZXJyIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxNQUFNQSxlQUFOLENBQXNCO0FBQ2xCQyxvQkFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQjtBQUN0QjtBQUNBLGNBQU1DLE9BQU9GLElBQUlHLElBQWpCO0FBQ0EsZUFBTyw2QkFDRkMsS0FERSxDQUNJRixLQUFLRyxPQURULEVBRUZDLElBRkUsQ0FFR0MsWUFBWTtBQUNkLGdCQUFJQSxTQUFTQyxNQUFULEdBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLHVCQUFPUCxJQUFJUSxJQUFKLENBQVM7QUFDWkMsNEJBQVEsU0FESTtBQUVaQyw4QkFBVUosU0FBUyxDQUFULEVBQVlLO0FBRlYsaUJBQVQsQ0FBUDtBQUlIO0FBQ0osU0FURSxFQVVGQyxLQVZFLENBVUlDLE9BQU87QUFDVixtQkFBT2IsSUFBSVEsSUFBSixDQUFTLEVBQUVDLFFBQVEsT0FBVixFQUFtQkssT0FBT0QsR0FBMUIsRUFBVCxDQUFQO0FBQ0gsU0FaRSxDQUFQO0FBYUg7QUFqQmlCOztrQkFvQlAsSUFBSWhCLGVBQUosRSIsImZpbGUiOiJWYWxpZGF0ZUZlZWRVUkwuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZWVkcGFyc2VyIGZyb20gXCJmZWVkcGFyc2VyLXByb21pc2VkXCI7XG5cbmNsYXNzIFZhbGlkYXRlRmVlZFVSTCB7XG4gICAgdmFsaWRhdGVfc2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIC8vIFZhbGlkYXRlIHRoYXQgdGhlIHVybCBpcyBhY2Nlc3NpYmxlXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXEuYm9keTtcbiAgICAgICAgcmV0dXJuIGZlZWRwYXJzZXJcbiAgICAgICAgICAgIC5wYXJzZShkYXRhLmZlZWRVUkwpXG4gICAgICAgICAgICAudGhlbihhcnRpY2xlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFydGljbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkSW5mbzogYXJ0aWNsZXNbMF0ubWV0YVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgc3RhdHVzOiBcImVycm9yXCIsIGVycm9yOiBlcnIgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWYWxpZGF0ZUZlZWRVUkwoKTtcbiJdfQ==