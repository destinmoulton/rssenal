import Feeds from "../models/Feeds.model";

class FeedsController {
    get_all(req, res){
        Feeds
            .find({}, (err, feeds)=>{
                if(err) 
                    res.send(err);
                res.send(feeds);
            })
            .sort({name: 'asc'});
    }

    add(req, res){
        let newFeed = new Feeds(req.body);
        newFeed.save((err, feed)=>{
            if(err)
                res.send(err);
            res.json(feed);
        });
    }

    get_single(req, res){
        Feeds.findById(req.params.feedId, (err, feed)=>{
            if(err)
                res.send(err);
            res.json(feed);
        });
    }

    delete_single(req, res){
        Feeds.remove({_id: req.params.feedId}, (err)=>{
            if(err)
                res.send(err);
            res.json({message: "Feed deleted."});
        })
    }
}

export default new FeedsController();