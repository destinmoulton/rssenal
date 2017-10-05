"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedSchema = _mongoose2.default.Schema({
    title: {
        type: String,
        required: [true, "The feed title is required."]
    },
    feedgroup_id: {
        type: String
    },
    url: {},
    description: {
        type: String
    },
    link: {
        type: String
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