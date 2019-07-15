import feedparser from "feedparser-promised";

class ValidateFeedURL {
    validate_single(req, res) {
        // Validate that the url is accessible
        const data = req.body;
        return feedparser
            .parse(data.feedURL)
            .then(articles => {
                if (articles.length > 0) {
                    return res.json({
                        status: "success",
                        feedInfo: articles[0].meta
                    });
                }
            })
            .catch(err => {
                return res.json({ status: "error", error: err });
            });
    }
}

export default new ValidateFeedURL();
