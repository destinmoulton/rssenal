"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntrySchema = _mongoose2.default.Schema({
    feed_id: {
        type: String
    },
    guid: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    creator: {
        type: String
    },
    content: {
        type: String
    },
    content_snippet: {
        type: String
    },
    publish_date: {
        type: Date
    },
    has_read: {
        type: Boolean,
        default: false
    }
});

exports.default = _mongoose2.default.model("Entries", EntrySchema);