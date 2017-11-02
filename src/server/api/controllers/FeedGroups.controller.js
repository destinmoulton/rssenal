import FeedGroups from "../models/FeedGroups.model";

class FeedGroupsController {
    get_all(req, res){
        FeedGroups
            .find({}, (err, groups)=>{
                if(err) 
                    res.send(err);
                res.send(groups);
            })
            .sort({order: 'asc'});
    }

    add(req, res){
        // Add a new feed group as the last in order
        FeedGroups.find({},(err, maxOrderedFeedGroup)=>{
            let data = req.body;

            let order = 0;
            if(maxOrderedFeedGroup.length > 0){
                order = maxOrderedFeedGroup[0].order + 1;
            }

            data['order'] = order;
            let newFeedGroup = new FeedGroups(data);
                newFeedGroup.save((err, group)=>{
                    if(err)
                        res.send(err);
                    res.json(group);
                });
            })
        .sort({order:'desc'})
        .limit(1);
    }

    get_single(req, res){
        FeedGroups.findById(req.params.feedGroupId, (err, group)=>{
            if(err)
                res.send(err);
            res.json(group);
        });
    }

    delete_single(req, res){
        FeedGroups.remove({_id: req.params.feedGroupId}, (err)=>{
            if(err)
                res.send(err);
            res.json({message: "Group deleted.", _id:req.params.feedGroupId, status: "success"});
        })
    }

    update_single(req, res){
        FeedGroups.findById(req.params.feedGroupId, (err, group)=>{
            if(err)
                res.send(err);
            group.name = req.body.name;
            group.save((err, updatedGroup)=>{
                if(err)
                    res.send(err);
                
                res.json(updatedGroup);
            })
        });
    }

    update_multiple(req, res){
        const updatedFeedgroups = req.body.feedgroups;
        const newFeedgroups = [];
        updatedFeedgroups.map((updatedFeedgroup)=>{
            FeedGroups.findById(updatedFeedgroup._id, (err, existingFeedgroup)=>{
                if(err){
                    // TODO Add err handler?
                } else {
                    existingFeedgroup.name = updatedFeedgroup.name;
                    existingFeedgroup.order = updatedFeedgroup.order;
                    existingFeedgroup.save((err, newFeedgroup)=>{
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

export default new FeedGroupsController();