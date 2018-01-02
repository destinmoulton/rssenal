"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedSchema = _mongoose2.default.Schema({
    title: {
        type: String,
        required: [true, "The feed title is required."]
    },
    folder_id: {
        type: String
    },
    url: {},
    description: {
        type: String
    },
    link: {
        type: String
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date
    }
});

exports.default = _mongoose2.default.model("Feeds", FeedSchema);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL21vZGVscy9GZWVkcy5tb2RlbC5qcyJdLCJuYW1lcyI6WyJGZWVkU2NoZW1hIiwiU2NoZW1hIiwidGl0bGUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJmb2xkZXJfaWQiLCJ1cmwiLCJkZXNjcmlwdGlvbiIsImxpbmsiLCJjcmVhdGlvbl9kYXRlIiwiRGF0ZSIsImRlZmF1bHQiLCJub3ciLCJsYXN0X3VwZGF0ZWQiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWEsbUJBQVNDLE1BQVQsQ0FBZ0I7QUFDL0JDLFdBQU87QUFDSEMsY0FBTUMsTUFESDtBQUVIQyxrQkFBVSxDQUFDLElBQUQsRUFBTyw2QkFBUDtBQUZQLEtBRHdCO0FBSy9CQyxlQUFXO0FBQ1BILGNBQU1DO0FBREMsS0FMb0I7QUFRL0JHLFNBQUssRUFSMEI7QUFTL0JDLGlCQUFhO0FBQ1RMLGNBQU1DO0FBREcsS0FUa0I7QUFZL0JLLFVBQU07QUFDRk4sY0FBTUM7QUFESixLQVp5QjtBQWUvQk0sbUJBQWU7QUFDWFAsY0FBTVEsSUFESztBQUVYQyxpQkFBU0QsS0FBS0U7QUFGSCxLQWZnQjtBQW1CL0JDLGtCQUFjO0FBQ1ZYLGNBQU1RO0FBREk7QUFuQmlCLENBQWhCLENBQW5COztrQkF3QmUsbUJBQVNJLEtBQVQsQ0FBZSxPQUFmLEVBQXdCZixVQUF4QixDIiwiZmlsZSI6IkZlZWRzLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBGZWVkU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hKHtcbiAgICB0aXRsZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJUaGUgZmVlZCB0aXRsZSBpcyByZXF1aXJlZC5cIl1cbiAgICB9LFxuICAgIGZvbGRlcl9pZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHVybDoge30sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBsaW5rOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgY3JlYXRpb25fZGF0ZToge1xuICAgICAgICB0eXBlOiBEYXRlLFxuICAgICAgICBkZWZhdWx0OiBEYXRlLm5vd1xuICAgIH0sXG4gICAgbGFzdF91cGRhdGVkOiB7XG4gICAgICAgIHR5cGU6IERhdGVcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWwoXCJGZWVkc1wiLCBGZWVkU2NoZW1hKTtcbiJdfQ==