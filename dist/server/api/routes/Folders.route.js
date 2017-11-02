"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _Folders = require("../controllers/Folders.controller");

var _Folders2 = _interopRequireDefault(_Folders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _Folders2.default.get_all);
router.post('/', _Folders2.default.add);
router.put('/', _Folders2.default.update_multiple);

router.get('/:folderId', _Folders2.default.get_single);
router.delete('/:folderId', _Folders2.default.delete_single);
router.put('/:folderId', _Folders2.default.update_single);

exports.default = router;