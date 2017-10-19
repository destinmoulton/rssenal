"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _Entries = require("../controllers/Entries.controller");

var _Entries2 = _interopRequireDefault(_Entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _Entries2.default.getAll.bind(_Entries2.default));
router.put('/:entryId', _Entries2.default.updateSingle);

exports.default = router;