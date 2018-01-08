"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feedparserPromised = require("feedparser-promised");

var _feedparserPromised2 = _interopRequireDefault(_feedparserPromised);

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
            return _feedparserPromised2.default.parse(data.feedURL).then(function (articles) {
                if (articles.length > 0) {
                    return res.json({
                        status: "success",
                        feedInfo: articles[0].meta
                    });
                }
            }).catch(function (err) {
                return res.json({ status: "error", error: err });
            });
        }
    }]);

    return ValidateFeedURL;
}();

exports.default = new ValidateFeedURL();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL1ZhbGlkYXRlRmVlZFVSTC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRlRmVlZFVSTCIsInJlcSIsInJlcyIsImRhdGEiLCJib2R5IiwicGFyc2UiLCJmZWVkVVJMIiwidGhlbiIsImFydGljbGVzIiwibGVuZ3RoIiwianNvbiIsInN0YXR1cyIsImZlZWRJbmZvIiwibWV0YSIsImNhdGNoIiwiZXJyb3IiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRU1BLGU7Ozs7Ozs7d0NBQ2NDLEcsRUFBS0MsRyxFQUFLO0FBQ3RCO0FBQ0EsZ0JBQU1DLE9BQU9GLElBQUlHLElBQWpCO0FBQ0EsbUJBQU8sNkJBQ0ZDLEtBREUsQ0FDSUYsS0FBS0csT0FEVCxFQUVGQyxJQUZFLENBRUcsb0JBQVk7QUFDZCxvQkFBSUMsU0FBU0MsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUNyQiwyQkFBT1AsSUFBSVEsSUFBSixDQUFTO0FBQ1pDLGdDQUFRLFNBREk7QUFFWkMsa0NBQVVKLFNBQVMsQ0FBVCxFQUFZSztBQUZWLHFCQUFULENBQVA7QUFJSDtBQUNKLGFBVEUsRUFVRkMsS0FWRSxDQVVJLGVBQU87QUFDVix1QkFBT1osSUFBSVEsSUFBSixDQUFTLEVBQUVDLFFBQVEsT0FBVixFQUFtQkksT0FBT0MsR0FBMUIsRUFBVCxDQUFQO0FBQ0gsYUFaRSxDQUFQO0FBYUg7Ozs7OztrQkFHVSxJQUFJaEIsZUFBSixFIiwiZmlsZSI6IlZhbGlkYXRlRmVlZFVSTC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZlZWRwYXJzZXIgZnJvbSBcImZlZWRwYXJzZXItcHJvbWlzZWRcIjtcblxuY2xhc3MgVmFsaWRhdGVGZWVkVVJMIHtcbiAgICB2YWxpZGF0ZV9zaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgLy8gVmFsaWRhdGUgdGhhdCB0aGUgdXJsIGlzIGFjY2Vzc2libGVcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuICAgICAgICByZXR1cm4gZmVlZHBhcnNlclxuICAgICAgICAgICAgLnBhcnNlKGRhdGEuZmVlZFVSTClcbiAgICAgICAgICAgIC50aGVuKGFydGljbGVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXJ0aWNsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWRJbmZvOiBhcnRpY2xlc1swXS5tZXRhXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oeyBzdGF0dXM6IFwiZXJyb3JcIiwgZXJyb3I6IGVyciB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZhbGlkYXRlRmVlZFVSTCgpO1xuIl19