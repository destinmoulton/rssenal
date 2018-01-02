"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rssParser = require("rss-parser");

var _rssParser2 = _interopRequireDefault(_rssParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateFeedURL = function () {
    function ValidateFeedURL() {
        _classCallCheck(this, ValidateFeedURL);
    }

    _createClass(ValidateFeedURL, [{
        key: "validate_single",
        value: function validate_single(req, res) {
            // Validate that the url is accessible
            var data = req.body;
            _rssParser2.default.parseURL(data.feedURL, function (err, valres, body) {
                if (err) {
                    res.json({ status: "error", error: err });
                }

                res.json({
                    status: "success",
                    feedInfo: valres
                });
            });
        }
    }]);

    return ValidateFeedURL;
}();

exports.default = new ValidateFeedURL();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL1ZhbGlkYXRlRmVlZFVSTC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRlRmVlZFVSTCIsInJlcSIsInJlcyIsImRhdGEiLCJib2R5IiwicGFyc2VVUkwiLCJmZWVkVVJMIiwiZXJyIiwidmFscmVzIiwianNvbiIsInN0YXR1cyIsImVycm9yIiwiZmVlZEluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRU1BLGU7Ozs7Ozs7d0NBQ2NDLEcsRUFBS0MsRyxFQUFLO0FBQ3RCO0FBQ0EsZ0JBQU1DLE9BQU9GLElBQUlHLElBQWpCO0FBQ0EsZ0NBQU9DLFFBQVAsQ0FBZ0JGLEtBQUtHLE9BQXJCLEVBQThCLFVBQUNDLEdBQUQsRUFBTUMsTUFBTixFQUFjSixJQUFkLEVBQXVCO0FBQ2pELG9CQUFJRyxHQUFKLEVBQVM7QUFDTEwsd0JBQUlPLElBQUosQ0FBUyxFQUFFQyxRQUFRLE9BQVYsRUFBbUJDLE9BQU9KLEdBQTFCLEVBQVQ7QUFDSDs7QUFFREwsb0JBQUlPLElBQUosQ0FBUztBQUNMQyw0QkFBUSxTQURIO0FBRUxFLDhCQUFVSjtBQUZMLGlCQUFUO0FBSUgsYUFURDtBQVVIOzs7Ozs7a0JBR1UsSUFBSVIsZUFBSixFIiwiZmlsZSI6IlZhbGlkYXRlRmVlZFVSTC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhcnNlciBmcm9tIFwicnNzLXBhcnNlclwiO1xuXG5jbGFzcyBWYWxpZGF0ZUZlZWRVUkwge1xuICAgIHZhbGlkYXRlX3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICAvLyBWYWxpZGF0ZSB0aGF0IHRoZSB1cmwgaXMgYWNjZXNzaWJsZVxuICAgICAgICBjb25zdCBkYXRhID0gcmVxLmJvZHk7XG4gICAgICAgIHBhcnNlci5wYXJzZVVSTChkYXRhLmZlZWRVUkwsIChlcnIsIHZhbHJlcywgYm9keSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHsgc3RhdHVzOiBcImVycm9yXCIsIGVycm9yOiBlcnIgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIGZlZWRJbmZvOiB2YWxyZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWYWxpZGF0ZUZlZWRVUkwoKTtcbiJdfQ==