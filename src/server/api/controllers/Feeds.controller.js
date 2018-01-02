import Entries from "../models/Entries.model";
import Feeds from "../models/Feeds.model";

class FeedsController {
    get_all(req, res) {
        Feeds.find({}, (err, feeds) => {
            if (err) {
                res.json({
                    status: "error",
                    error: err
                });
            } else {
                res.json({ status: "success", feeds });
            }
        }).sort({ title: "asc" });
    }

    add(req, res) {
        let newFeed = new Feeds(req.body);
        newFeed.save((err, feed) => {
            if (err) {
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

    get_single(req, res) {
        Feeds.findById(req.params.feedId, (err, feed) => {
            if (err) {
                res.json({
                    status: "error",
                    error: "Unable to get single feed."
                });
            } else {
                res.json(feed);
            }
        });
    }

    delete_single(req, res) {
        Entries.remove({ feed_id: req.params.feedId }, err => {
            // TODO: Add err handler?
            if (err) {
                return res.json({
                    status: "error",
                    error: "Unable to remove entries for feed."
                });
            }

            Feeds.remove({ _id: req.params.feedId }, err => {
                if (err) {
                    return res.json({
                        status: "error",
                        error: "Unable to remove the feed."
                    });
                }
                res.json({ status: "success" });
            });
        });
    }

    update_single(req, res) {
        Feeds.findById(req.params.feedId, (err, feed) => {
            if (err || feed.length === 0) {
                res.json({
                    status: "error",
                    error: "Unable to find that feed to update."
                });
            } else {
                feed.title = req.body.title;
                feed.folder_id = req.body.folder_id;
                feed.save((err, feedInfo) => {
                    if (err) {
                        res.json({
                            status: "error",
                            error: "Unable to save the new feed information."
                        });
                    } else {
                        const data = {
                            status: "success",
                            feedInfo
                        };
                        res.json(data);
                    }
                });
            }
        });
    }
}

export default new FeedsController();
