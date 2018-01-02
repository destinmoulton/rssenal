import Folders from "../models/Folders.model";

class FoldersController {
    get_all(req, res) {
        Folders.find({}, (err, folders) => {
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
        Folders.find({}, (err, maxOrderedFolder) => {
            let data = req.body;

            let order = 0;
            if (maxOrderedFolder.length > 0) {
                order = maxOrderedFolder[0].order + 1;
            }

            data["order"] = order;
            let newFolder = new Folders(data);
            newFolder.save((err, folder) => {
                if (err) {
                    res.json({
                        status: "error",
                        message:
                            "There was a problem getting adding the folder."
                    });
                } else {
                    res.json(folder);
                }
            });
        })
            .sort({ order: "desc" })
            .limit(1);
    }

    get_single(req, res) {
        Folders.findById(req.params.folderId, (err, folder) => {
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
        Folders.remove({ _id: req.params.folderId }, err => {
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

    update_single(req, res) {
        Folders.findById(req.params.folderId, (err, folder) => {
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
                        message:
                            "There was a problem saving the updated folder."
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
            Folders.findById(updatedFolder._id, (err, existingFolder) => {
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

export default new FoldersController();
