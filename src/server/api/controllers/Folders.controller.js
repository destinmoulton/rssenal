import Folders from "../models/Folders.model";

class FoldersController {
    get_all(req, res){
        Folders
            .find({}, (err, folders)=>{
                if(err) 
                    res.send(err);
                res.send(folders);
            })
            .sort({order: 'asc'});
    }

    add(req, res){
        // Add a new feed folder as the last in order
        Folders.find({},(err, maxOrderedFolder)=>{
            let data = req.body;

            let order = 0;
            if(maxOrderedFolder.length > 0){
                order = maxOrderedFolder[0].order + 1;
            }

            data['order'] = order;
            let newFolder = new Folders(data);
                newFolder.save((err, folder)=>{
                    if(err)
                        res.send(err);
                    res.json(folder);
                });
            })
        .sort({order:'desc'})
        .limit(1);
    }

    get_single(req, res){
        Folders.findById(req.params.folderId, (err, folder)=>{
            if(err)
                res.send(err);
            res.json(folder);
        });
    }

    delete_single(req, res){
        Folders.remove({_id: req.params.folderId}, (err)=>{
            if(err)
                res.send(err);
            res.json({message: "Folder deleted.", _id:req.params.folderId, status: "success"});
        })
    }

    update_single(req, res){
        Folders.findById(req.params.folderId, (err, folder)=>{
            if(err)
                res.send(err);
            folder.name = req.body.name;
            folder.save((err, updatedFolder)=>{
                if(err)
                    res.send(err);
                
                res.json(updatedFolder);
            })
        });
    }

    update_multiple(req, res){
        const updatedFolders = req.body.folders;
        const newFolders = [];
        updatedFolders.map((updatedFolder)=>{
            Folders.findById(updatedFolder._id, (err, existingFolder)=>{
                if(err){
                    // TODO Add err handler?
                } else {
                    existingFolder.name = updatedFolder.name;
                    existingFolder.order = updatedFolder.order;
                    existingFolder.save((err, newFolder)=>{
                        if(err){
                            // TODO Add err handler?
                        }
                    });
                }
            });
        });

        res.json({
            status: "success"
        })
    }
}

export default new FoldersController();