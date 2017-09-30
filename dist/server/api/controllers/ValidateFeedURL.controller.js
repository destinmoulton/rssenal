"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

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
            (0, _request2.default)(req.params.feedUrl, function (err, res, body) {
                var status = "success";
                if (err || res.statusCode !== 200) {
                    status = "error";
                }

                res.json({ status: status });
            });
        }
    }]);

    return ValidateFeedURL;
}();