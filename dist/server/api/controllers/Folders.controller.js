'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Folders = require('../models/Folders.model');

var _Folders2 = _interopRequireDefault(_Folders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoldersController = function () {
    function FoldersController() {
        _classCallCheck(this, FoldersController);
    }

    _createClass(FoldersController, [{
        key: 'get_all',
        value: function get_all(req, res) {
            _Folders2.default.find({}, function (err, folders) {
                if (err) res.send(err);
                res.send(folders);
            }).sort({ order: 'asc' });
        }
    }, {
        key: 'add',
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
                    if (err) res.send(err);
                    res.json(folder);
                });
            }).sort({ order: 'desc' }).limit(1);
        }
    }, {
        key: 'get_single',
        value: function get_single(req, res) {
            _Folders2.default.findById(req.params.folderId, function (err, folder) {
                if (err) res.send(err);
                res.json(folder);
            });
        }
    }, {
        key: 'delete_single',
        value: function delete_single(req, res) {
            _Folders2.default.remove({ _id: req.params.folderId }, function (err) {
                if (err) res.send(err);
                res.json({ message: "Folder deleted.", _id: req.params.folderId, status: "success" });
            });
        }
    }, {
        key: 'update_single',
        value: function update_single(req, res) {
            _Folders2.default.findById(req.params.folderId, function (err, folder) {
                if (err) res.send(err);
                folder.name = req.body.name;
                folder.save(function (err, updatedFolder) {
                    if (err) res.send(err);

                    res.json(updatedFolder);
                });
            });
        }
    }, {
        key: 'update_multiple',
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