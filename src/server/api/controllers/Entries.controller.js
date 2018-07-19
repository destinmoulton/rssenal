import feedparser from "feedparser-promised";
import moment from "moment";

import Entries from "../models/Entries.model";
import Feeds from "../models/Feeds.model";

class EntriesController {
    async get(req, res) {
        try {
            await this._updateFeedEntries(req.query.feedId);

            let query = {
                feed_id: req.query.feedId
            };

            if (req.query.hasOwnProperty("showEntriesHasRead")) {
                if (req.query["showEntriesHasRead"] === "false") {
                    // This logic might seem odd,
                    // but we only want to add this query parameter
                    // when we do NOT want to view the has_read entries
                    query["has_read"] = false;
                }
            }
            const entries = await Entries.find(query).sort({
                publish_date: "desc"
            });

            return res.json({
                status: "success",
                entries
            });
        } catch (err) {
            return res.json({
                status: "error",
                error:
                    "Unable to get entries for feed. " +
                    err.message +
                    ". Feed ID " +
                    req.query.feedId
            });
        }
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

    _updateFeedEntries = async feedId => {
        try {
            const feed = await Feeds.findOne({
                _id: feedId
            });

            const timeAgo = moment().subtract(15, "minutes");
            if (
                feed.last_updated !== undefined &&
                moment(feed.last_updated).isAfter(timeAgo)
            ) {
                // The feed was recently updated, so no need to parse
                return true;
            }

            // Get and parse the RSS feed
            const entries = await feedparser.parse(feed.url);

            entries.forEach(async entry => {
                await this._addNewEntry(feedId, entry);
            });

            // Update the time of update
            feed.last_updated = new Date();
            await feed.save(err => {
                if (err) {
                    throw new Error(err);
                }
            });

            return true;
        } catch (err) {
            throw err;
        }
    };

    _addNewEntry = async (feedId, newEntry) => {
        const query = {
            feed_id: feedId,
            guid: newEntry.guid
        };

        try {
            const foundEntry = await Entries.findOne(query);
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
                return await insert.save();
            }
            return true;
        } catch (err) {
            throw err;
        }
    };
}

export default new EntriesController();
