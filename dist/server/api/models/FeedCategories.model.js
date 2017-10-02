"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedCategorySchema = _mongoose2.default.Schema({
    name: {
        type: String,
        required: [true, "You must include a category name."]
    }
});

exports.default = _mongoose2.default.model("FeedCategories", FeedCategorySchema);