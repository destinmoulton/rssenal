import FeedGroups from "../models/FeedGroups.model";

class FeedGroupsController {
    get_all(req, res){
        FeedGroups
            .find({}, (err, groups)=>{
                if(err) 
                    res.send(err);
                res.send(groups);
            })
            .sort({name: 'asc'});
    }

    add(req, res){
        let newFeed = new FeedGroups(req.body);
        newFeed.save((err, group)=>{
            if(err)
                res.send(err);
            res.json(group);
        });
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
            res.json({message: "Group deleted."});
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
}

export default new FeedGroupsController();