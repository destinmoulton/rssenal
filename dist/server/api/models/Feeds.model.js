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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL21vZGVscy9GZWVkcy5tb2RlbC5qcyJdLCJuYW1lcyI6WyJGZWVkU2NoZW1hIiwiU2NoZW1hIiwidGl0bGUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJmb2xkZXJfaWQiLCJ1cmwiLCJkZXNjcmlwdGlvbiIsImxpbmsiLCJjcmVhdGlvbl9kYXRlIiwiRGF0ZSIsImRlZmF1bHQiLCJub3ciLCJsYXN0X3VwZGF0ZWQiLCJtb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWEsbUJBQVNDLE1BQVQsQ0FBZ0I7QUFDL0JDLFdBQU87QUFDSEMsY0FBTUMsTUFESDtBQUVIQyxrQkFBVSxDQUFDLElBQUQsRUFBTyw2QkFBUDtBQUZQLEtBRHdCO0FBSy9CQyxlQUFXO0FBQ1BILGNBQU1DO0FBREMsS0FMb0I7QUFRL0JHLFNBQUssRUFSMEI7QUFXL0JDLGlCQUFhO0FBQ1RMLGNBQU1DO0FBREcsS0FYa0I7QUFjL0JLLFVBQU07QUFDRk4sY0FBTUM7QUFESixLQWR5QjtBQWlCL0JNLG1CQUFlO0FBQ1hQLGNBQU1RLElBREs7QUFFWEMsaUJBQVNELEtBQUtFO0FBRkgsS0FqQmdCO0FBcUIvQkMsa0JBQWM7QUFDVlgsY0FBTVE7QUFESTtBQXJCaUIsQ0FBaEIsQ0FBbkI7O2tCQTBCZSxtQkFBU0ksS0FBVCxDQUFlLE9BQWYsRUFBd0JmLFVBQXhCLEMiLCJmaWxlIjoiRmVlZHMubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IEZlZWRTY2hlbWEgPSBtb25nb29zZS5TY2hlbWEoe1xuICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlRoZSBmZWVkIHRpdGxlIGlzIHJlcXVpcmVkLlwiXVxuICAgIH0sXG4gICAgZm9sZGVyX2lkOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdXJsOiB7XG5cbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbGluazoge1xuICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGNyZWF0aW9uX2RhdGU6IHtcbiAgICAgICAgdHlwZTogRGF0ZSxcbiAgICAgICAgZGVmYXVsdDogRGF0ZS5ub3dcbiAgICB9LFxuICAgIGxhc3RfdXBkYXRlZDoge1xuICAgICAgICB0eXBlOiBEYXRlXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsKFwiRmVlZHNcIiwgRmVlZFNjaGVtYSk7Il19