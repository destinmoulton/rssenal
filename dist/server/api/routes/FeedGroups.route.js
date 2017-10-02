"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _FeedGroups = require("../controllers/FeedGroups.controller");

var _FeedGroups2 = _interopRequireDefault(_FeedGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _FeedGroups2.default.get_all);
router.post('/', _FeedGroups2.default.add);

router.get('/:feedGroupId', _FeedGroups2.default.get_single);
router.delete('/:feedGroupId', _FeedGroups2.default.delete_single);

exports.default = router;