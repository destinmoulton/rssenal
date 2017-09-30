import feedsRoutes from "./api/routes/Feeds.route";
import validateFeedURL from "./api/routes/ValidateFeedURL.route";

export default function(app){
    app.use('/api/feeds', feedsRoutes);
    app.use('/api/validatefeedurl', validateFeedURL);
}