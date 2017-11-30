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
            }).sort({ order: 'asc' });
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

                data['order'] = order;
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
            }).sort({ order: 'desc' }).limit(1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvYXBpL2NvbnRyb2xsZXJzL0ZvbGRlcnMuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJGb2xkZXJzQ29udHJvbGxlciIsInJlcSIsInJlcyIsImZpbmQiLCJlcnIiLCJmb2xkZXJzIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJzb3J0Iiwib3JkZXIiLCJtYXhPcmRlcmVkRm9sZGVyIiwiZGF0YSIsImJvZHkiLCJsZW5ndGgiLCJuZXdGb2xkZXIiLCJzYXZlIiwiZm9sZGVyIiwibGltaXQiLCJmaW5kQnlJZCIsInBhcmFtcyIsImZvbGRlcklkIiwicmVtb3ZlIiwiX2lkIiwibmFtZSIsInVwZGF0ZWRGb2xkZXIiLCJ1cGRhdGVkRm9sZGVycyIsIm5ld0ZvbGRlcnMiLCJtYXAiLCJleGlzdGluZ0ZvbGRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFTUEsaUI7Ozs7Ozs7Z0NBQ01DLEcsRUFBS0MsRyxFQUFJO0FBQ2IsOEJBQ0tDLElBREwsQ0FDVSxFQURWLEVBQ2MsVUFBQ0MsR0FBRCxFQUFNQyxPQUFOLEVBQWdCO0FBQ3RCLG9CQUFHRCxHQUFILEVBQVE7QUFDSkYsd0JBQUlJLElBQUosQ0FBUztBQUNMQyxnQ0FBUSxPQURIO0FBRUxDLGlDQUFTO0FBRkoscUJBQVQ7QUFJSCxpQkFMRCxNQUtPO0FBQ0hOLHdCQUFJSSxJQUFKLENBQVNELE9BQVQ7QUFDSDtBQUVKLGFBWEwsRUFZS0ksSUFaTCxDQVlVLEVBQUNDLE9BQU8sS0FBUixFQVpWO0FBYUg7Ozs0QkFFR1QsRyxFQUFLQyxHLEVBQUk7QUFDVDtBQUNBLDhCQUFRQyxJQUFSLENBQWEsRUFBYixFQUFnQixVQUFDQyxHQUFELEVBQU1PLGdCQUFOLEVBQXlCO0FBQ3JDLG9CQUFJQyxPQUFPWCxJQUFJWSxJQUFmOztBQUVBLG9CQUFJSCxRQUFRLENBQVo7QUFDQSxvQkFBR0MsaUJBQWlCRyxNQUFqQixHQUEwQixDQUE3QixFQUErQjtB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QUFvQixVQUFDWixHQUFELEVBQU1XLFNBQU4sRUFBa0I7QUFDbEMsZ0NBQUdYLEdBQUgsRUFBTztBQUNIO0FBQ0g7QUFDSix5QkFKRDtBQUtIO0FBQ0osaUJBWkQ7QUFhSCxhQWREOztBQWdCQUYsZ0JBQUlJLElBQUosQ0FBUztBQUNMQyx3QkFBUTtBQURILGFBQVQ7QUFHSDs7Ozs7O2tCQUdVLElBQUlQLGlCQUFKLEUiLCJmaWxlIjoiRm9sZGVycy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZvbGRlcnMgZnJvbSBcIi4uL21vZGVscy9Gb2xkZXJzLm1vZGVsXCI7XG5cbmNsYXNzIEZvbGRlcnNDb250cm9sbGVyIHtcbiAgICBnZXRfYWxsKHJlcSwgcmVzKXtcbiAgICAgICAgRm9sZGVyc1xuICAgICAgICAgICAgLmZpbmQoe30sIChlcnIsIGZvbGRlcnMpPT57XG4gICAgICAgICAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGdldHRpbmcgYWxsIEZvbGRlcnMuXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmpzb24oZm9sZGVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zb3J0KHtvcmRlcjogJ2FzYyd9KTtcbiAgICB9XG5cbiAgICBhZGQocmVxLCByZXMpe1xuICAgICAgICAvLyBBZGQgYSBuZXcgZmVlZCBmb2xkZXIgYXMgdGhlIGxhc3QgaW4gb3JkZXJcbiAgICAgICAgRm9sZGVycy5maW5kKHt9LChlcnIsIG1heE9yZGVyZWRGb2xkZXIpPT57XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHJlcS5ib2R5O1xuXG4gICAgICAgICAgICBsZXQgb3JkZXIgPSAwO1xuICAgICAgICAgICAgaWYobWF4T3JkZXJlZEZvbGRlci5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBvcmRlciA9IG1heE9yZGVyZWRGb2xkZXJbMF0ub3JkZXIgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhWydvcmRlciddID0gb3JkZXI7XG4gICAgICAgICAgICBsZXQgbmV3Rm9sZGVyID0gbmV3IEZvbGRlcnMoZGF0YSk7XG4gICAgICAgICAgICAgICAgbmV3Rm9sZGVyLnNhdmUoKGVyciwgZm9sZGVyKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gZ2V0dGluZyBhZGRpbmcgdGhlIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuanNvbihmb2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAuc29ydCh7b3JkZXI6J2Rlc2MnfSlcbiAgICAgICAgLmxpbWl0KDEpO1xuICAgIH1cblxuICAgIGdldF9zaW5nbGUocmVxLCByZXMpe1xuICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZm9sZGVySWQsIChlcnIsIGZvbGRlcik9PntcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBnZXR0aW5nIGEgc2luZ2xlIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbihmb2xkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVfc2luZ2xlKHJlcSwgcmVzKXtcbiAgICAgICAgRm9sZGVycy5yZW1vdmUoe19pZDogcmVxLnBhcmFtcy5mb2xkZXJJZH0sIChlcnIpPT57XG4gICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW0gZGVsZXRpbmcgdGhlIGZvbGRlci5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIF9pZDogcmVxLnBhcmFtcy5mb2xkZXJJZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZV9zaW5nbGUocmVxLCByZXMpe1xuICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHJlcS5wYXJhbXMuZm9sZGVySWQsIChlcnIsIGZvbGRlcik9PntcbiAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBmaW5kaW5nIHRoZSBmb2xkZXIgdG8gdXBkYXRlLlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb2xkZXIubmFtZSA9IHJlcS5ib2R5Lm5hbWU7XG4gICAgICAgICAgICBmb2xkZXIuc2F2ZSgoZXJyLCB1cGRhdGVkRm9sZGVyKT0+e1xuICAgICAgICAgICAgICAgIGlmKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBzYXZpbmcgdGhlIHVwZGF0ZWQgZm9sZGVyLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKHVwZGF0ZWRGb2xkZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZV9tdWx0aXBsZShyZXEsIHJlcyl7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRGb2xkZXJzID0gcmVxLmJvZHkuZm9sZGVycztcbiAgICAgICAgY29uc3QgbmV3Rm9sZGVycyA9IFtdO1xuICAgICAgICB1cGRhdGVkRm9sZGVycy5tYXAoKHVwZGF0ZWRGb2xkZXIpPT57XG4gICAgICAgICAgICBGb2xkZXJzLmZpbmRCeUlkKHVwZGF0ZWRGb2xkZXIuX2lkLCAoZXJyLCBleGlzdGluZ0ZvbGRlcik9PntcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0ZvbGRlci5uYW1lID0gdXBkYXRlZEZvbGRlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0ZvbGRlci5vcmRlciA9IHVwZGF0ZWRGb2xkZXIub3JkZXI7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRm9sZGVyLnNhdmUoKGVyciwgbmV3Rm9sZGVyKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIEFkZCBlcnIgaGFuZGxlcj9cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCJcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBGb2xkZXJzQ29udHJvbGxlcigpOyJdfQ==