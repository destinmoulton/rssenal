"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntrySchema = _mongoose2.default.Schema({
    feed_id: {
        type: String
    },
    guid: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    creator: {
        type: String
    },
    content: {
        type: String
    },
    content_snippet: {
        type: String
    },
    publish_date: {
        type: Date
    },
    has_read: {
        type: Boolean,
        default: false
    }
});

EntrySchema.index({ title: "text", content: "text" });

exports.default = _mongoose2.default.model("Entries", EntrySchema);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL21vZGVscy9FbnRyaWVzLm1vZGVsLmpzIl0sIm5hbWVzIjpbIkVudHJ5U2NoZW1hIiwiU2NoZW1hIiwiZmVlZF9pZCIsInR5cGUiLCJTdHJpbmciLCJndWlkIiwidGl0bGUiLCJsaW5rIiwiY3JlYXRvciIsImNvbnRlbnQiLCJjb250ZW50X3NuaXBwZXQiLCJwdWJsaXNoX2RhdGUiLCJEYXRlIiwiaGFzX3JlYWQiLCJCb29sZWFuIiwiZGVmYXVsdCIsImluZGV4IiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjLG1CQUFTQyxNQUFULENBQWdCO0FBQ2hDQyxhQUFTO0FBQ0xDLGNBQU1DO0FBREQsS0FEdUI7QUFJaENDLFVBQU07QUFDRkYsY0FBTUM7QUFESixLQUowQjtBQU9oQ0UsV0FBTztBQUNISCxjQUFNQztBQURILEtBUHlCO0FBVWhDRyxVQUFNO0FBQ0ZKLGNBQU1DO0FBREosS0FWMEI7QUFhaENJLGFBQVM7QUFDTEwsY0FBTUM7QUFERCxLQWJ1QjtBQWdCaENLLGFBQVM7QUFDTE4sY0FBTUM7QUFERCxLQWhCdUI7QUFtQmhDTSxxQkFBaUI7QUFDYlAsY0FBTUM7QUFETyxLQW5CZTtBQXNCaENPLGtCQUFjO0FBQ1ZSLGNBQU1TO0FBREksS0F0QmtCO0FBeUJoQ0MsY0FBVTtBQUNOVixjQUFNVyxPQURBO0FBRU5DLGlCQUFTO0FBRkg7QUF6QnNCLENBQWhCLENBQXBCOztBQStCQWYsWUFBWWdCLEtBQVosQ0FBa0IsRUFBRVYsT0FBTyxNQUFULEVBQWlCRyxTQUFTLE1BQTFCLEVBQWxCOztrQkFFZSxtQkFBU1EsS0FBVCxDQUFlLFNBQWYsRUFBMEJqQixXQUExQixDIiwiZmlsZSI6IkVudHJpZXMubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IEVudHJ5U2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hKHtcbiAgICBmZWVkX2lkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgZ3VpZDoge1xuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbGluazoge1xuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGNyZWF0b3I6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgY29udGVudF9zbmlwcGV0OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgcHVibGlzaF9kYXRlOiB7XG4gICAgICAgIHR5cGU6IERhdGVcbiAgICB9LFxuICAgIGhhc19yZWFkOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxufSk7XG5cbkVudHJ5U2NoZW1hLmluZGV4KHsgdGl0bGU6IFwidGV4dFwiLCBjb250ZW50OiBcInRleHRcIiB9KTtcblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWwoXCJFbnRyaWVzXCIsIEVudHJ5U2NoZW1hKTtcbiJdfQ==