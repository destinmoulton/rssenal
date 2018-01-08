import feedparser from "feedparser-promised";

import Entries from "../models/Entries.model";
import Feeds from "../models/Feeds.model";

class EntriesController {
    get(req, res) {
        return this._updateFeed(req.query.feedId)
            .then(() => {
                let query = {
                    feed_id: req.query.feedId
                };
                if (req.query.hasOwnProperty("hasRead")) {
                    query["has_read"] = req.query.hasRead;
                }
                return Entries.find(query).sort({ publish_date: "desc" });
            })
            .then(entries => {
                return res.json({
                    status: "success",
                    entries
                });
            })
            .catch(err => {
                return res.json({
                    status: "error",
                    error: "Unable to update all feeds." + err.message
                });
            });
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
        return Feeds.findOne({ _id: feedId })
            .then(feed => {
                return feedparser.parse(feed.url);
            })
            .then(entries => {
                let entryPromises = [];
                entries.forEach(entry => {
                    entryPromises.push(this._addNewEntry(feedId, entry));
                });
                // Add all the entries
                return Promise.all(entryPromises);
            });
    }

    _addNewEntry(feedId, newEntry) {
        console.log(
            "Entries.controller :: _addNewEntry :: pubDate = " +
                newEntry.pubDate
        );
        const query = {
            feed_id: feedId,
            guid: newEntry.guid
        };
        return Entries.findOne(query).then(foundEntry => {
            if (!foundEntry || !foundEntry._id) {
                const data = {
                    feed_id: feedId,
                    guid: newEntry.guid,
                    title: newEntry.title,
                    link: newEntry.link,
                    creator: newEntry.author,
                    content: newEntry.description,
                    content_snippet: newEntry.summary,
                    publish_date: newEntry.pubDate
                };
                const insert = new Entries(data);
                return insert.save();
            }
            return true;
        });
    }
}

export default new EntriesController();
