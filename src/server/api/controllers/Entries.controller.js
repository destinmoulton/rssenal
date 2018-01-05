import parser from "rss-parser";

import Entries from "../models/Entries.model";
import Feeds from "../models/Feeds.model";

class EntriesController {
    get(req, res) {
        try {
            this._updateFeed(req.query.feedId);
        } catch (e) {
            return res.json({
                status: "error",
                error: "Unable to update all feeds." + e.message
            });
        }

        let query = {
            feed_id: req.query.feedId
        };
        if (req.query.hasOwnProperty("hasRead")) {
            query["has_read"] = req.query.hasRead;
        }
        Entries.find(query, (err, entries) => {
            if (err) {
                res.json({
                    status: "error",
                    error: "Unable to get all entries."
                });
            } else {
                res.json({
                    status: "success",
                    entries
                });
            }
        }).sort({ publish_date: "desc" });
    }

    updateSingle(req, res) {
        Entries.findById(req.params.entryId, (err, entry) => {
            if (err) {
                res.json({
                    status: "error",
                    error:
                        "Unable to find the entry with id: " +
                        req.params.entryId
                });
            } else {
                const data = req.body;
                if (data.hasOwnProperty("has_read")) {
                    entry.has_read = data.has_read;
                }
                entry.save((err, newEntry) => {
                    if (err) {
                        res.json({
                            status: "error",
                            error: "Unable to save the updated entry."
                        });
                    } else {
                        res.json({
                            status: "success",
                            entry: newEntry
                        });
                    }
                });
            }
        });
    }

    _updateFeed(feedId) {
        Feeds.findOne({ _id: feedId }, (err, feed) => {
            if (err) {
                throw new Error(err);
            }

            parser.parseURL(feed.url, (err, parsedFeed) => {
                // TODO: Add err handler?

                parsedFeed.feed.entries.forEach(entry => {
                    const query = {
                        feed_id: feed._id,
                        guid: entry.guid
                    };
                    Entries.find(query, (err, possibleEntry) => {
                        if (possibleEntry.length === 0) {
                            const data = {
                                ...entry,
                                feed_id: feed._id,
                                publish_date: entry.isoDate
                            };
                            const newEntry = new Entries(data);
                            newEntry.save((err, entry) => {
                                // TODO: Add err handler?
                            });
                        }
                    }).limit(1);
                });
            });
        });
    }
}

export default new EntriesController();
