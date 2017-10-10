
import parser from "rss-parser";

import Entries from "../models/Entries.model";
import Feeds from "../models/Feeds.model";


class EntriesController {
    get_all(req, res){
        Entries
            .find({}, (err, entries)=>{
                if(err) 
                    res.send(err);
                res.send({
                    status: "success",
                    entries
                });
            })
            .sort({publish_date: 'desc'});
    }

    update_all(req, res){

        Feeds.find({}, (err, feeds)=>{
            if(err) {
                return res.json({
                    status: "error",
                    error: "Feeds not found."
                })
            }

            feeds.forEach((feed)=>{
                parser.parseURL(feed.url, (err, parsedFeed)=>{
                    if(err){

                    }

                    parsedFeed.feed.entries.forEach((entry)=>{
                        const query = {
                            feed_id: feed._id,
                            guid: entry.guid
                        }
                        Entries.find(query, (err, possibleEntry)=>{
                            if(possibleEntry.length === 0){
                                const data = {
                                    ...entry,
                                    feed_id: feed._id,
                                    publish_date: entry.isoDate
                                }
                                const newEntry = new Entries(data);
                                newEntry.save((err, entry)=>{
        
                                })
                            }
                        }).limit(1);

                    });
                })
            })
            return res.json({
                status: "success"
            });
        });
    }
}

export default new EntriesController();