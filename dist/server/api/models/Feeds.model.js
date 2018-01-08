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
    url: {
        type: String
    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL21vZGVscy9GZWVkcy5tb2RlbC5qcyJdLCJuYW1lcyI6WyJGZWVkU2NoZW1hIiwiU2NoZW1hIiwidGl0bGUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJmb2xkZXJfaWQiLCJ1cmwiLCJkZXNjcmlwdGlvbiIsImxpbmsiLCJjcmVhdGlvbl9kYXRlIiwiRGF0ZSIsImRlZmF1bHQiLCJub3ciLCJsYXN0X3VwZGF0ZWQiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWEsbUJBQVNDLE1BQVQsQ0FBZ0I7QUFDL0JDLFdBQU87QUFDSEMsY0FBTUMsTUFESDtBQUVIQyxrQkFBVSxDQUFDLElBQUQsRUFBTyw2QkFBUDtBQUZQLEtBRHdCO0FBSy9CQyxlQUFXO0FBQ1BILGNBQU1DO0FBREMsS0FMb0I7QUFRL0JHLFNBQUs7QUFDREosY0FBTUM7QUFETCxLQVIwQjtBQVcvQkksaUJBQWE7QUFDVEwsY0FBTUM7QUFERyxLQVhrQjtBQWMvQkssVUFBTTtBQUNGTixjQUFNQztBQURKLEtBZHlCO0FBaUIvQk0sbUJBQWU7QUFDWFAsY0FBTVEsSUFESztBQUVYQyxpQkFBU0QsS0FBS0U7QUFGSCxLQWpCZ0I7QUFxQi9CQyxrQkFBYztBQUNWWCxjQUFNUTtBQURJO0FBckJpQixDQUFoQixDQUFuQjs7a0JBMEJlLG1CQUFTSSxLQUFULENBQWUsT0FBZixFQUF3QmYsVUFBeEIsQyIsImZpbGUiOiJGZWVkcy5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgRmVlZFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICByZXF1aXJlZDogW3RydWUsIFwiVGhlIGZlZWQgdGl0bGUgaXMgcmVxdWlyZWQuXCJdXG4gICAgfSxcbiAgICBmb2xkZXJfaWQ6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB1cmw6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGxpbms6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBjcmVhdGlvbl9kYXRlOiB7XG4gICAgICAgIHR5cGU6IERhdGUsXG4gICAgICAgIGRlZmF1bHQ6IERhdGUubm93XG4gICAgfSxcbiAgICBsYXN0X3VwZGF0ZWQ6IHtcbiAgICAgICAgdHlwZTogRGF0ZVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbChcIkZlZWRzXCIsIEZlZWRTY2hlbWEpO1xuIl19