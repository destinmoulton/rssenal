"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _requireJWT = require("../../lib/requireJWT");

var _requireJWT2 = _interopRequireDefault(_requireJWT);

var _Entries = require("../controllers/Entries.controller");

var _Entries2 = _interopRequireDefault(_Entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/", _requireJWT2.default, _Entries2.default.get.bind(_Entries2.default));
router.put("/:entryId", _requireJWT2.default, _Entries2.default.updateSingle);

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL3JvdXRlcy9lbnRyaWVzLnJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsImdldCIsImJpbmQiLCJwdXQiLCJ1cGRhdGVTaW5nbGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBSEEsSUFBTUEsU0FBUyxrQkFBUUMsTUFBUixFQUFmOztBQUtBRCxPQUFPRSxHQUFQLENBQVcsR0FBWCx3QkFBNEIsa0JBQVFBLEdBQVIsQ0FBWUMsSUFBWixtQkFBNUI7QUFDQUgsT0FBT0ksR0FBUCxDQUFXLFdBQVgsd0JBQW9DLGtCQUFRQyxZQUE1Qzs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQlAsTUFBakIiLCJmaWxlIjoiZW50cmllcy5yb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5pbXBvcnQgcmVxdWlyZUpXVCBmcm9tIFwiLi4vLi4vbGliL3JlcXVpcmVKV1RcIjtcbmltcG9ydCBlbnRyaWVzIGZyb20gXCIuLi9jb250cm9sbGVycy9FbnRyaWVzLmNvbnRyb2xsZXJcIjtcblxucm91dGVyLmdldChcIi9cIiwgcmVxdWlyZUpXVCwgZW50cmllcy5nZXQuYmluZChlbnRyaWVzKSk7XG5yb3V0ZXIucHV0KFwiLzplbnRyeUlkXCIsIHJlcXVpcmVKV1QsIGVudHJpZXMudXBkYXRlU2luZ2xlKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG4iXX0=