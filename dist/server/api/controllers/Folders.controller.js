"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

var _Folders = require("../models/Folders.model");

var _Folders2 = _interopRequireDefault(_Folders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoldersController = function () {
    function FoldersController() {
        _classCallCheck(this, FoldersController);
    }

    _createClass(FoldersController, [{
        key: "get_all",
        value: function get_all(req, res) {
            _Folders2.default.find({}, function (err, folders) {
                if (err) {
                    res.json({
                        status: "error",
                        message: "There was a problem getting all Folders."
                    });
                } else {
                    res.json(folders);
                }
            }).sort({ order: "asc" });
        }
    }, {
        key: "add",
        value: function add(req, res) {
            // Add a new feed folder as the last in order
            _Folders2.default.find({}, function (err, maxOrderedFolder) {
                var data = req.body;

                var order = 0;
                if (maxOrderedFolder.length > 0) {
                    order = maxOrderedFolder[0].order + 1;
                }

                data["order"] = order;
                var newFolder = new _Folders2.default(data);
                newFolder.save(function (err, folder) {
                    if (err) {
                        res.json({
                            status: "error",
                            message: "There was a problem getting adding the folder."
                        });
                    } else {
                        res.json(folder);
                    }
                });
            }).sort({ order: "desc" }).limit(1);
        }
    }, {
        key: "get_single",
        value: function get_single(req, res) {
            _Folders2.default.findById(req.params.folderId, function (err, folder) {
                if (err) {
                    res.json({
                        status: "error",
                        message: "There was a problem getting a single folder."
                    });
                } else {
                    res.json(folder);
                }
            });
        }
    }, {
        key: "delete_single",
        value: function delete_single(req, res) {
            var folderId = req.params.folderId;
            var json = { status: "" };
            // Move all the feeds to 'Uncategorized' folder
            _Feeds2.default.find({ folder_id: folderId }, function (err, feeds) {
                if (err) {
                    json = {
                        status: "error",
                        message: "Unable to get the feeds for the folder."
                    };
                } else {
                    if (feeds.length > 0) {
                        feeds.forEach(function (feed) {
                            feed.folder_id = 0;
                            feed.save(function (err, newFeed) {
                                if (err) {
                                    json = {
                                        status: "error",
                                        message: "Unable to change feed folder."
                                    };
                                }
                            });
                        });
                    }
                }
            });

            if (json.status === "error") {
                res.json(json);
            } else {
                _Folders2.default.remove({ _id: folderId }, function (err) {
                    if (err) {
                        res.json({
                            status: "error",
                            message: "There was a problem deleting the folder."
                        });
                    } else {
                        res.json({
                            status: "success",
                            _id: folderId
                        });
                    }
                });
            }
        }
    }, {
        key: "update_single",
        value: function update_single(req, res) {
            _Folders2.default.findById(req.params.folderId, function (err, folder) {
                if (err) {
                    res.json({
                        status: "error",
                        message: "There was a problem finding the folder to update."
                    });
                }
                folder.name = req.body.name;
                folder.save(function (err, updatedFolder) {
                    if (err) {
                        res.json({
                            status: "error",
                            message: "There was a problem saving the updated folder."
                        });
                    } else {
                        res.json(updatedFolder);
                    }
                });
            });
        }
    }, {
        key: "update_multiple",
        value: function update_multiple(req, res) {
            var updatedFolders = req.body.folders;
            var newFolders = [];
            updatedFolders.map(function (updatedFolder) {
                _Folders2.default.findById(updatedFolder._id, function (err, existingFolder) {
                    if (err) {
                        // TODO Add err handler?
                    } else {
                        existingFolder.name = updatedFolder.name;
                        existingFolder.order = updatedFolder.order;
                        existingFolder.save(function (err, newFolder) {
                            if (err) {
                                // TODO Add err handler?
                            }
                        });
                    }
                });
            });

            res.json({
                status: "success"
            });
        }
    }]);

    return FoldersController;
}();

exports.default = new FoldersController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZvbGRlcnMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJGb2xkZXJzQ29udHJvbGxlciIsInJlcSIsInJlcyIsImZpbmQiLCJlcnIiLCJmb2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJzb3J0Iiwib3JkZXIiLCJtYXhPcmRlcmVkRm9sZGVyIiwiZGF0YSIsImJvZHkiLCJsZW5ndGgiLCJuZXdGb2xkZXIiLCJzYXZlIiwiZm9sZGVyIiwibGltaXQiLCJmaW5kQnlJZCIsInBhcmFtcyIsImZvbGRlcklkIiwiZm9sZGVyX2lkIiwiZmVlZHMiLCJmb3JFYWNoIiwiZmVlZCIsIm5ld0ZlZWQiLCJyZW1vdmUiLCJfaWQiLCJuYW1lIiwidXBkYXRlZEZvbGRlciIsInVwZGF0ZWRGb2xkZXJzIiwibmV3Rm9sZGVycyIsIm1hcCIsImV4aXN0aW5nRm9sZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLGlCOzs7Ozs7O2dDQUNNQyxHLEVBQUtDLEcsRUFBSztBQUNkLDhCQUFRQyxJQUFSLENBQWEsRUFBYixFQUFpQixVQUFDQyxHQUFELEVBQU1DLE9BQU4sRUFBa0I7QUFDL0Isb0JBQUlELEdBQUosRUFBUztBQUNMRix3QkFBSUksSUFBSixDQUFTO0FBQ0xDLGdDQUFRLE9BREg7QUFFTEMsaUNBQVM7QUFGSixxQkFBVDtBQUlILGlCQUxELE1BS087QUFDSE4sd0JBQUlJLElBQUosQ0FBU0QsT0FBVDtBQUNIO0FBQ0osYUFURCxFQVNHSSxJQVRILENBU1EsRUFBRUMsT0FBTyxLQUFULEVBVFI7QUFVSDs7OzRCQUVHVCxHLEVBQUtDLEcsRUFBSztBQUNWO0FBQ0EsOEJBQVFDLElBQVIsQ0FBYSxFQUFiLEVBQWlCLFVBQUNDLEdBQUQsRUFBTU8sZ0JBQU4sRUFBMkI7QUFDeEMsb0JBQUlDLE9BQU9YLElBQUlZLElBQWY7O0FBRUEsb0JBQUlI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QyxpQ0FBUztBQUZKLHFCQUFUO0FBSUg7QUFDRFMsdUJBQU9ZLElBQVAsR0FBYzVCLElBQUlZLElBQUosQ0FBU2dCLElBQXZCO0FBQ0FaLHVCQUFPRCxJQUFQLENBQVksVUFBQ1osR0FBRCxFQUFNMEIsYUFBTixFQUF3QjtBQUNoQyx3QkFBSTFCLEdBQUosRUFBUztBQUNMRiw0QkFBSUksSUFBSixDQUFTO0FBQ0xDLG9DQUFRLE9BREg7QUFFTEMscUNBQ0k7QUFIQyx5QkFBVDtBQUtILHFCQU5ELE1BTU87QUFDSE4sNEJBQUlJLElBQUosQ0FBU3dCLGFBQVQ7QUFDSDtBQUNKLGlCQVZEO0FBV0gsYUFuQkQ7QUFvQkg7Ozt3Q0FFZTdCLEcsRUFBS0MsRyxFQUFLO0FBQ3RCLGdCQUFNNkIsaUJBQWlCOUIsSUFBSVksSUFBSixDQUFTUixPQUFoQztBQUNBLGdCQUFNMkIsYUFBYSxFQUFuQjtBQUNBRCwyQkFBZUUsR0FBZixDQUFtQix5QkFBaUI7QUFDaEMsa0NBQVFkLFFBQVIsQ0FBaUJXLGNBQWNGLEdBQS9CLEVBQW9DLFVBQUN4QixHQUFELEVBQU04QixjQUFOLEVBQXlCO0FBQ3pELHdCQUFJOUIsR0FBSixFQUFTO0FBQ0w7QUFDSCxxQkFGRCxNQUVPO0FBQ0g4Qix1Q0FBZUwsSUFBZixHQUFzQkMsY0FBY0QsSUFBcEM7QUFDQUssdUNBQWV4QixLQUFmLEdBQXVCb0IsY0FBY3BCLEtBQXJDO0FBQ0F3Qix1Q0FBZWxCLElBQWYsQ0FBb0IsVUFBQ1osR0FBRCxFQUFNVyxTQUFOLEVBQW9CO0FBQ3BDLGdDQUFJWCxHQUFKLEVBQVM7QUFDTDtBQUNIO0FBQ0oseUJBSkQ7QUFLSDtBQUNKLGlCQVpEO0FBYUgsYUFkRDs7QUFnQkFGLGdCQUFJSSxJQUFKLENBQVM7QUFDTEMsd0JBQVE7QUFESCxhQUFUO0FBR0g7Ozs7OztrQkFHVSxJQUFJUCxpQkFBSixFIiwiZmlsZSI6IkZvbGRlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGZWVkcyBmcm9tIFwiLi4vbW9kZWxzL0ZlZWRzLm1vZGVsXCI7XG5pbXBvcnQgRm9sZGVycyBmcm9tIFwiLi4vbW9kZWxzL0ZvbGRlcnMubW9kZWxcIjtcblxuY2xhc3MgRm9sZGVyc0NvbnRyb2xsZXIge1xuICAgIGdldF9hbGwocmVxLCByZXMpIHtcbiAgICAgICAgRm9sZGVycy5maW5kKHt9LCAoZXJyLCBmb2xkZXJzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGdldHRpbmcgYWxsIEZvbGRlcnMuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oZm9sZGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnNvcnQoeyBvcmRlcjogXCJhc2NcIiB9KTtcbiAgICB9XG5cbiAgICBhZGQocmVxLCByZXMpIHtcbiAgICAgICAgLy8gQWRkIGEgbmV3IGZlZWQgZm9sZGVyIGFzIHRoZSBsYXN0IGluIG9yZGVyXG4gICAgICAgIEZvbGRlcnMuZmluZCh7fSwgKGVyciwgbWF4T3JkZXJlZEZvbGRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXEuYm9keTtcblxuICAgICAgICAgICAgbGV0IG9yZGVyID0gMDtcbiAgICAgICAgICAgIGlmIChtYXhPcmRlcmVkRm9sZGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBvcmRlciA9IG1heE9yZGVyZWRGb2xkZXJbMF0ub3JkZXIgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhW1wib3JkZXJcIl0gPSBvcmRlcjtcbiAgICAgICAgICAgIGxldCBuZXdGb2xkZXIgPSBuZXcgRm9sZGVycyhkYXRhKTtcbiAgICAgICAgICAgIG5ld0ZvbGRlci5zYXZlKChlcnIsIGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBnZXR0aW5nIGFkZGluZyB0aGUgZm9sZGVyLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKGZvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuc29ydCh7IG9yZGVyOiBcImRlc2NcIiB9KVxuICAgICAgICAgICAgLmxpbWl0KDEpO1xuICAgIH1cblxuICAgIGdldF9zaW5nbGUocmVxLCByZXMpIHtcbiAgICAgICAgRm9sZGVycy5maW5kQnlJZChyZXEucGFyYW1zLmZvbGRlcklkLCAoZXJyLCBmb2xkZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gZ2V0dGluZyBhIHNpbmdsZSBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oZm9sZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlX3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBjb25zdCBmb2xkZXJJZCA9IHJlcS5wYXJhbXMuZm9sZGVySWQ7XG4gICAgICAgIGxldCBqc29uID0geyBzdGF0dXM6IFwiXCIgfTtcbiAgICAgICAgLy8gTW92ZSBhbGwgdGhlIGZlZWRzIHRvICdVbmNhdGVnb3JpemVkJyBmb2xkZXJcbiAgICAgICAgRmVlZHMuZmluZCh7IGZvbGRlcl9pZDogZm9sZGVySWQgfSwgKGVyciwgZmVlZHMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJVbmFibGUgdG8gZ2V0IHRoZSBmZWVkcyBmb3IgdGhlIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChmZWVkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZlZWRzLmZvckVhY2goZmVlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkLmZvbGRlcl9pZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWVkLnNhdmUoKGVyciwgbmV3RmVlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJVbmFibGUgdG8gY2hhbmdlIGZlZWQgZm9sZGVyLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGpzb24uc3RhdHVzID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIHJlcy5qc29uKGpzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRm9sZGVycy5yZW1vdmUoeyBfaWQ6IGZvbGRlcklkIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBkZWxldGluZyB0aGUgZm9sZGVyLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IGZvbGRlcklkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlX3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZm9sZGVySWQsIChlcnIsIGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSBmb2xkZXIgdG8gdXBkYXRlLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb2xkZXIubmFtZSA9IHJlcS5ib2R5Lm5hbWU7XG4gICAgICAgICAgICBmb2xkZXIuc2F2ZSgoZXJyLCB1cGRhdGVkRm9sZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHNhdmluZyB0aGUgdXBkYXRlZCBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24odXBkYXRlZEZvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZV9tdWx0aXBsZShyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB1cGRhdGVkRm9sZGVycyA9IHJlcS5ib2R5LmZvbGRlcnM7XG4gICAgICAgIGNvbnN0IG5ld0ZvbGRlcnMgPSBbXTtcbiAgICAgICAgdXBkYXRlZEZvbGRlcnMubWFwKHVwZGF0ZWRGb2xkZXIgPT4ge1xuICAgICAgICAgICAgRm9sZGVycy5maW5kQnlJZCh1cGRhdGVkRm9sZGVyLl9pZCwgKGVyciwgZXhpc3RpbmdGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gQWRkIGVyciBoYW5kbGVyP1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRm9sZGVyLm5hbWUgPSB1cGRhdGVkRm9sZGVyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRm9sZGVyLm9yZGVyID0gdXBkYXRlZEZvbGRlci5vcmRlcjtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdGb2xkZXIuc2F2ZSgoZXJyLCBuZXdGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCJcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRm9sZGVyc0NvbnRyb2xsZXIoKTtcbiJdfQ==