"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Feeds = require("../models/Feeds.model");

var _Feeds2 = _interopRequireDefault(_Feeds);

var _Folders = require("../models/Folders.model");

var _Folders2 = _interopRequireDefault(_Folders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FoldersController {
    get_all(req, res) {
        _Folders2.default.find({}, (err, folders) => {
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

    add(req, res) {
        // Add a new feed folder as the last in order
        _Folders2.default.find({}, (err, maxOrderedFolder) => {
            let data = req.body;

            let order = 0;
            if (maxOrderedFolder.length > 0) {
                order = maxOrderedFolder[0].order + 1;
            }

            data["order"] = order;
            let newFolder = new _Folders2.default(data);
            newFolder.save((err, folder) => {
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

    get_single(req, res) {
        _Folders2.default.findById(req.params.folderId, (err, folder) => {
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

    delete_single(req, res) {
        const folderId = req.params.folderId;
        let json = { status: "" };
        // Move all the feeds to 'Uncategorized' folder
        _Feeds2.default.find({ folder_id: folderId }, (err, feeds) => {
            if (err) {
                json = {
                    status: "error",
                    message: "Unable to get the feeds for the folder."
                };
            } else {
                if (feeds.length > 0) {
                    feeds.forEach(feed => {
                        feed.folder_id = 0;
                        feed.save((err, newFeed) => {
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
            _Folders2.default.remove({ _id: folderId }, err => {
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

    update_single(req, res) {
        _Folders2.default.findById(req.params.folderId, (err, folder) => {
            if (err) {
                res.json({
                    status: "error",
                    message: "There was a problem finding the folder to update."
                });
            }
            folder.name = req.body.name;
            folder.save((err, updatedFolder) => {
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

    update_multiple(req, res) {
        const updatedFolders = req.body.folders;
        const newFolders = [];
        updatedFolders.map(updatedFolder => {
            _Folders2.default.findById(updatedFolder._id, (err, existingFolder) => {
                if (err) {
                    // TODO Add err handler?
                } else {
                    existingFolder.name = updatedFolder.name;
                    existingFolder.order = updatedFolder.order;
                    existingFolder.save((err, newFolder) => {
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
}

exports.default = new FoldersController();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZvbGRlcnMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJGb2xkZXJzQ29udHJvbGxlciIsImdldF9hbGwiLCJyZXEiLCJyZXMiLCJmaW5kIiwiZXJyIiwiZm9sZGVycyIsImpzb24iLCJzdGF0dXMiLCJtZXNzYWdlIiwic29ydCIsIm9yZGVyIiwiYWRkIiwibWF4T3JkZXJlZEZvbGRlciIsImRhdGEiLCJib2R5IiwibGVuZ3RoIiwibmV3Rm9sZGVyIiwic2F2ZSIsImZvbGRlciIsImxpbWl0IiwiZ2V0X3NpbmdsZSIsImZpbmRCeUlkIiwicGFyYW1zIiwiZm9sZGVySWQiLCJkZWxldGVfc2luZ2xlIiwiZm9sZGVyX2lkIiwiZmVlZHMiLCJmb3JFYWNoIiwiZmVlZCIsIm5ld0ZlZWQiLCJyZW1vdmUiLCJfaWQiLCJ1cGRhdGVfc2luZ2xlIiwibmFtZSIsInVwZGF0ZWRGb2xkZXIiLCJ1cGRhdGVfbXVsdGlwbGUiLCJ1cGRhdGVkRm9sZGVycyIsIm5ld0ZvbGRlcnMiLCJtYXAiLCJleGlzdGluZ0ZvbGRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsaUJBQU4sQ0FBd0I7QUFDcEJDLFlBQVFDLEdBQVIsRUFBYUMsR0FBYixFQUFrQjtBQUNkLDBCQUFRQyxJQUFSLENBQWEsRUFBYixFQUFpQixDQUFDQyxHQUFELEVBQU1DLE9BQU4sS0FBa0I7QUFDL0IsZ0JBQUlELEdBQUosRUFBUztBQUNMRixvQkFBSUksSUFBSixDQUFTO0FBQ0xDLDRCQUFRLE9BREg7QUFFTEMsNkJBQVM7QUFGSixpQkFBVDtBQUlILGFBTEQsTUFLTztBQUNITixvQkFBSUksSUFBSixDQUFTRCxPQUFUO0FBQ0g7QUFDSixTQVRELEVBU0dJLElBVEgsQ0FTUSxFQUFFQyxPQUFPLEtBQVQsRUFUUjtBQVVIOztBQUVEQyxRQUFJVixHQUFKLEVBQVNDLEdBQVQsRUFBYztBQUNW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WUFBSUksSUFBSixDQUFTO0FBQ0xDLG9CQUFRO0FBREgsU0FBVDtBQUdIO0FBbEptQjs7a0JBcUpULElBQUlSLGlCQUFKLEUiLCJmaWxlIjoiRm9sZGVycy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZlZWRzIGZyb20gXCIuLi9tb2RlbHMvRmVlZHMubW9kZWxcIjtcbmltcG9ydCBGb2xkZXJzIGZyb20gXCIuLi9tb2RlbHMvRm9sZGVycy5tb2RlbFwiO1xuXG5jbGFzcyBGb2xkZXJzQ29udHJvbGxlciB7XG4gICAgZ2V0X2FsbChyZXEsIHJlcykge1xuICAgICAgICBGb2xkZXJzLmZpbmQoe30sIChlcnIsIGZvbGRlcnMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gZ2V0dGluZyBhbGwgRm9sZGVycy5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbihmb2xkZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc29ydCh7IG9yZGVyOiBcImFzY1wiIH0pO1xuICAgIH1cblxuICAgIGFkZChyZXEsIHJlcykge1xuICAgICAgICAvLyBBZGQgYSBuZXcgZmVlZCBmb2xkZXIgYXMgdGhlIGxhc3QgaW4gb3JkZXJcbiAgICAgICAgRm9sZGVycy5maW5kKHt9LCAoZXJyLCBtYXhPcmRlcmVkRm9sZGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcS5ib2R5O1xuXG4gICAgICAgICAgICBsZXQgb3JkZXIgPSAwO1xuICAgICAgICAgICAgaWYgKG1heE9yZGVyZWRGb2xkZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG9yZGVyID0gbWF4T3JkZXJlZEZvbGRlclswXS5vcmRlciArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbXCJvcmRlclwiXSA9IG9yZGVyO1xuICAgICAgICAgICAgbGV0IG5ld0ZvbGRlciA9IG5ldyBGb2xkZXJzKGRhdGEpO1xuICAgICAgICAgICAgbmV3Rm9sZGVyLnNhdmUoKGVyciwgZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGdldHRpbmcgYWRkaW5nIHRoZSBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oZm9sZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0KHsgb3JkZXI6IFwiZGVzY1wiIH0pXG4gICAgICAgICAgICAubGltaXQoMSk7XG4gICAgfVxuXG4gICAgZ2V0X3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZm9sZGVySWQsIChlcnIsIGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBnZXR0aW5nIGEgc2luZ2xlIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbihmb2xkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVfc2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IGZvbGRlcklkID0gcmVxLnBhcmFtcy5mb2xkZXJJZDtcbiAgICAgICAgbGV0IGpzb24gPSB7IHN0YXR1czogXCJcIiB9O1xuICAgICAgICAvLyBNb3ZlIGFsbCB0aGUgZmVlZHMgdG8gJ1VuY2F0ZWdvcml6ZWQnIGZvbGRlclxuICAgICAgICBGZWVkcy5maW5kKHsgZm9sZGVyX2lkOiBmb2xkZXJJZCB9LCAoZXJyLCBmZWVkcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVuYWJsZSB0byBnZXQgdGhlIGZlZWRzIGZvciB0aGUgZm9sZGVyLlwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGZlZWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmVlZHMuZm9yRWFjaChmZWVkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWQuZm9sZGVyX2lkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlZWQuc2F2ZSgoZXJyLCBuZXdGZWVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVuYWJsZSB0byBjaGFuZ2UgZmVlZCBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoanNvbi5zdGF0dXMgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgcmVzLmpzb24oanNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBGb2xkZXJzLnJlbW92ZSh7IF9pZDogZm9sZGVySWQgfSwgZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGRlbGV0aW5nIHRoZSBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogZm9sZGVySWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVfc2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEZvbGRlcnMuZmluZEJ5SWQocmVxLnBhcmFtcy5mb2xkZXJJZCwgKGVyciwgZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGZpbmRpbmcgdGhlIGZvbGRlciB0byB1cGRhdGUuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvbGRlci5uYW1lID0gcmVxLmJvZHkubmFtZTtcbiAgICAgICAgICAgIGZvbGRlci5zYXZlKChlcnIsIHVwZGF0ZWRGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRoZXJlIHdhcyBhIHByb2JsZW0gc2F2aW5nIHRoZSB1cGRhdGVkIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih1cGRhdGVkRm9sZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlX211bHRpcGxlKHJlcSwgcmVzKSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRGb2xkZXJzID0gcmVxLmJvZHkuZm9sZGVycztcbiAgICAgICAgY29uc3QgbmV3Rm9sZGVycyA9IFtdO1xuICAgICAgICB1cGRhdGVkRm9sZGVycy5tYXAodXBkYXRlZEZvbGRlciA9PiB7XG4gICAgICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHVwZGF0ZWRGb2xkZXIuX2lkLCAoZXJyLCBleGlzdGluZ0ZvbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBBZGQgZXJyIGhhbmRsZXI/XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdGb2xkZXIubmFtZSA9IHVwZGF0ZWRGb2xkZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdGb2xkZXIub3JkZXIgPSB1cGRhdGVkRm9sZGVyLm9yZGVyO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0ZvbGRlci5zYXZlKChlcnIsIG5ld0ZvbGRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gQWRkIGVyciBoYW5kbGVyP1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIlxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBGb2xkZXJzQ29udHJvbGxlcigpO1xuIl19