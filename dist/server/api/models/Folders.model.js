"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FolderSchema = _mongoose2.default.Schema({
    name: {
        type: String,
        required: [true, "You must include a folder name."]
    },
    order: {
        type: Number
    }
});

exports.default = _mongoose2.default.model("Folders", FolderSchema);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL21vZGVscy9Gb2xkZXJzLm1vZGVsLmpzIl0sIm5hbWVzIjpbIkZvbGRlclNjaGVtYSIsIlNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJvcmRlciIsIk51bWJlciIsIm1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsZUFBZSxtQkFBU0MsTUFBVCxDQUFnQjtBQUNqQ0MsVUFBTTtBQUNGQyxjQUFNQyxNQURKO0FBRUZDLGtCQUFVLENBQUMsSUFBRCxFQUFPLGlDQUFQO0FBRlIsS0FEMkI7QUFLakNDLFdBQU87QUFDSEgsY0FBTUk7QUFESDtBQUwwQixDQUFoQixDQUFyQjs7a0JBVWUsbUJBQVNDLEtBQVQsQ0FBZSxTQUFmLEVBQTBCUixZQUExQixDIiwiZmlsZSI6IkZvbGRlcnMubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IEZvbGRlclNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgbmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJZb3UgbXVzdCBpbmNsdWRlIGEgZm9sZGVyIG5hbWUuXCJdXG4gICAgfSxcbiAgICBvcmRlcjoge1xuICAgICAgICB0eXBlOiBOdW1iZXJcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWwoXCJGb2xkZXJzXCIsIEZvbGRlclNjaGVtYSk7XG4iXX0=