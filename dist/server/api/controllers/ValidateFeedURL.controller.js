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