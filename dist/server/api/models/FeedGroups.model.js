"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedGroupSchema = _mongoose2.default.Schema({
    name: {
        type: String,
        required: [true, "You must include a group name."]
    }
});

exports.default = _mongoose2.default.model("FeedGroups", FeedGroupSchema);