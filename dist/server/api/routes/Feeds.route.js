"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _Feeds = require("../controllers/Feeds.controller");

var _Feeds2 = _interopRequireDefault(_Feeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _Feeds2.default.get_all);
router.post('/', _Feeds2.default.add);

router.get('/:feedId', _Feeds2.default.get_single);
router.delete('/:feedId', _Feeds2.default.delete_single);
router.put('/:feedId', _Feeds2.default.update_single);
exports.default = router;