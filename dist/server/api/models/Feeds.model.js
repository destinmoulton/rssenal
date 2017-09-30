"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedSchema = _mongoose2.default.Schema({
    name: {
        type: String,
        required: [true, "The feed name is required."]
    },
    url: {
        type: String,
        required: [true, "The feed url is required."],
        validate: {
            isAsync: true,
            validator: function validator(v, cb) {
                // Validate that the url is accessible
                (0, _request2.default)(v, function (err, res, body) {
                    var isValid = true;
                    var msg = "";
                    if (err || res.statusCode !== 200) {
                        isValid = false;
                        msg = "There was an issue accessing the feed URL.";
                    }
                    cb(isValid, msg);
                });
            }
        }
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date
    }
});

exports.default = _mongoose2.default.model("Feeds", FeedSchema);