import Entries from "../models/Entries.model";
import Feeds from "../models/Feeds.model";

class FeedsController {
    get_all(req, res){
        Feeds
            .find({}, (err, feeds)=>{
                if(err) {
                    res.json({
                        status: "error",
                        error: err
                    });
                } else {
                    res.json({status: "success", feeds});
                }
            })
            .sort({title: 'asc'});
    }

    add(req, res){
        let newFeed = new Feeds(req.body);
        newFeed.save((err, feed)=>{
            if(err) {
                res.json({
                    status: "error",
                    error: err
                });
            } else {
                const data = {
                    status: "success",
                    feedInfo: feed
                };
                res.json(data);
            }
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
        Entries.remove({feed_id: req.params.feedId}, (err)=>{
            // TODO: Add err handler?

            Feeds.remove({_id: req.params.feedId}, (err)=>{
                if(err){
                    return res.send({status: "error"});
                }
                res.json({status: "success"});
            })
        });
        
    }
}

export default new FeedsController();