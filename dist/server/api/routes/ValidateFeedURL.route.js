"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ValidateFeedURL = require("../controllers/ValidateFeedURL.controller");

var _ValidateFeedURL2 = _interopRequireDefault(_ValidateFeedURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:feedUrl', _ValidateFeedURL2.default.validate_single);

exports.default = router;