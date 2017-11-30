"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _Entries = require("../controllers/Entries.controller");

var _Entries2 = _interopRequireDefault(_Entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _Entries2.default.get.bind(_Entries2.default));
router.put('/:entryId', _Entries2.default.updateSingle);

module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL3JvdXRlcy9lbnRyaWVzLnJvdXRlLmpzIl0sIm5hbWVzIjpbInJvdXRlciIsIlJvdXRlciIsImdldCIsImJpbmQiLCJwdXQiLCJ1cGRhdGVTaW5nbGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBR0E7Ozs7OztBQUZBLElBQU1BLFNBQVMsa0JBQVFDLE1BQVIsRUFBZjs7QUFJQUQsT0FBT0UsR0FBUCxDQUFXLEdBQVgsRUFBZ0Isa0JBQVFBLEdBQVIsQ0FBWUMsSUFBWixtQkFBaEI7QUFDQUgsT0FBT0ksR0FBUCxDQUFXLFdBQVgsRUFBd0Isa0JBQVFDLFlBQWhDOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCUCxNQUFqQiIsImZpbGUiOiJlbnRyaWVzLnJvdXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbmltcG9ydCBlbnRyaWVzIGZyb20gXCIuLi9jb250cm9sbGVycy9FbnRyaWVzLmNvbnRyb2xsZXJcIjtcblxucm91dGVyLmdldCgnLycsIGVudHJpZXMuZ2V0LmJpbmQoZW50cmllcykpO1xucm91dGVyLnB1dCgnLzplbnRyeUlkJywgZW50cmllcy51cGRhdGVTaW5nbGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjsiXX0=