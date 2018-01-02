"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            _Folders2.default.remove({ _id: req.params.folderId }, function (err) {
                if (err) {
                    res.json({
                        status: "error",
                        message: "There was a problem deleting the folder."
                    });
                } else {
                    res.json({
                        status: "success",
                        _id: req.params.folderId
                    });
                }
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZvbGRlcnMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJGb2xkZXJzQ29udHJvbGxlciIsInJlcSIsInJlcyIsImZpbmQiLCJlcnIiLCJmb2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJzb3J0Iiwib3JkZXIiLCJtYXhPcmRlcmVkRm9sZGVyIiwiZGF0YSIsImJvZHkiLCJsZW5ndGgiLCJuZXdGb2xkZXIiLCJzYXZlIiwiZm9sZGVyIiwibGltaXQiLCJmaW5kQnlJZCIsInBhcmFtcyIsImZvbGRlcklkIiwicmVtb3ZlIiwiX2lkIiwibmFtZSIsInVwZGF0ZWRGb2xkZXIiLCJ1cGRhdGVkRm9sZGVycyIsIm5ld0ZvbGRlcnMiLCJtYXAiLCJleGlzdGluZ0ZvbGRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsaUI7Ozs7Ozs7Z0NBQ01DLEcsRUFBS0MsRyxFQUFLO0FBQ2QsOEJBQVFDLElBQVIsQ0FBYSxFQUFiLEVBQWlCLFVBQUNDLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUMvQixvQkFBSUQsR0FBSixFQUFTO0FBQ0xGLHdCQUFJSSxJQUFKLENBQVM7QUFDTEMsZ0NBQVEsT0FESDtBQUVMQyxpQ0FBUztBQUZKLHFCQUFUO0FBSUgsaUJBTEQsTUFLTztBQUNITix3QkFBSUksSUFBSixDQUFTRCxPQUFUO0FBQ0g7QUFDSixhQVRELEVBU0dJLElBVEgsQ0FTUSxFQUFFQyxPQUFPLEtBQVQsRUFUUjtBQVVIOzs7NEJBRUdULEcsRUFBS0MsRyxFQUFLO0FBQ1Y7QUFDQSw4QkFBUUMsSUFBUixDQUFhLEVBQWIsRUFBaUIsVUFBQ0MsR0FBRCxFQUFNTyxnQkFBTixFQUEyQjtBQUN4QyxvQkFBSUMsT0FBT1gsSUFBSVksSUFBZjs7QUFFQSxvQkFBSUgsUUFBUSxDQUFaO0FBQ0Esb0JBQUlDLGlCQUFpQkcsTUFBakIsR0FBMEIsQ0FBOUIsRUFBaUM7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QUFNVyxTQUFOLEVBQW9CO0FBQ3BDLGdDQUFJWCxHQUFKLEVBQVM7QUFDTDtBQUNIO0FBQ0oseUJBSkQ7QUFLSDtBQUNKLGlCQVpEO0FBYUgsYUFkRDs7QUFnQkFGLGdCQUFJSSxJQUFKLENBQVM7QUFDTEMsd0JBQVE7QUFESCxhQUFUO0FBR0g7Ozs7OztrQkFHVSxJQUFJUCxpQkFBSixFIiwiZmlsZSI6IkZvbGRlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb2xkZXJzIGZyb20gXCIuLi9tb2RlbHMvRm9sZGVycy5tb2RlbFwiO1xuXG5jbGFzcyBGb2xkZXJzQ29udHJvbGxlciB7XG4gICAgZ2V0X2FsbChyZXEsIHJlcykge1xuICAgICAgICBGb2xkZXJzLmZpbmQoe30sIChlcnIsIGZvbGRlcnMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gZ2V0dGluZyBhbGwgRm9sZGVycy5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbihmb2xkZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuc29ydCh7IG9yZGVyOiBcImFzY1wiIH0pO1xuICAgIH1cblxuICAgIGFkZChyZXEsIHJlcykge1xuICAgICAgICAvLyBBZGQgYSBuZXcgZmVlZCBmb2xkZXIgYXMgdGhlIGxhc3QgaW4gb3JkZXJcbiAgICAgICAgRm9sZGVycy5maW5kKHt9LCAoZXJyLCBtYXhPcmRlcmVkRm9sZGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcS5ib2R5O1xuXG4gICAgICAgICAgICBsZXQgb3JkZXIgPSAwO1xuICAgICAgICAgICAgaWYgKG1heE9yZGVyZWRGb2xkZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG9yZGVyID0gbWF4T3JkZXJlZEZvbGRlclswXS5vcmRlciArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFbXCJvcmRlclwiXSA9IG9yZGVyO1xuICAgICAgICAgICAgbGV0IG5ld0ZvbGRlciA9IG5ldyBGb2xkZXJzKGRhdGEpO1xuICAgICAgICAgICAgbmV3Rm9sZGVyLnNhdmUoKGVyciwgZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGdldHRpbmcgYWRkaW5nIHRoZSBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oZm9sZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0KHsgb3JkZXI6IFwiZGVzY1wiIH0pXG4gICAgICAgICAgICAubGltaXQoMSk7XG4gICAgfVxuXG4gICAgZ2V0X3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZm9sZGVySWQsIChlcnIsIGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBnZXR0aW5nIGEgc2luZ2xlIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbihmb2xkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVfc2luZ2xlKHJlcSwgcmVzKSB7XG4gICAgICAgIEZvbGRlcnMucmVtb3ZlKHsgX2lkOiByZXEucGFyYW1zLmZvbGRlcklkIH0sIGVyciA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGRlbGV0aW5nIHRoZSBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBfaWQ6IHJlcS5wYXJhbXMuZm9sZGVySWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlX3NpbmdsZShyZXEsIHJlcykge1xuICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZm9sZGVySWQsIChlcnIsIGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSBmb2xkZXIgdG8gdXBkYXRlLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb2xkZXIubmFtZSA9IHJlcS5ib2R5Lm5hbWU7XG4gICAgICAgICAgICBmb2xkZXIuc2F2ZSgoZXJyLCB1cGRhdGVkRm9sZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHNhdmluZyB0aGUgdXBkYXRlZCBmb2xkZXIuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24odXBkYXRlZEZvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZV9tdWx0aXBsZShyZXEsIHJlcykge1xuICAgICAgICBjb25zdCB1cGRhdGVkRm9sZGVycyA9IHJlcS5ib2R5LmZvbGRlcnM7XG4gICAgICAgIGNvbnN0IG5ld0ZvbGRlcnMgPSBbXTtcbiAgICAgICAgdXBkYXRlZEZvbGRlcnMubWFwKHVwZGF0ZWRGb2xkZXIgPT4ge1xuICAgICAgICAgICAgRm9sZGVycy5maW5kQnlJZCh1cGRhdGVkRm9sZGVyLl9pZCwgKGVyciwgZXhpc3RpbmdGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gQWRkIGVyciBoYW5kbGVyP1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRm9sZGVyLm5hbWUgPSB1cGRhdGVkRm9sZGVyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRm9sZGVyLm9yZGVyID0gdXBkYXRlZEZvbGRlci5vcmRlcjtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdGb2xkZXIuc2F2ZSgoZXJyLCBuZXdGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCJcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRm9sZGVyc0NvbnRyb2xsZXIoKTtcbiJdfQ==