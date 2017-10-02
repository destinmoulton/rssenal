import feedGroupsRoutes from "./api/routes/FeedGroups.route"
import feedsRoutes from "./api/routes/Feeds.route";
import validateFeedURLRoutes from "./api/routes/ValidateFeedURL.route";

export default function(app){
    app.use('/api/feedgroups', feedGroupsRoutes);
    app.use('/api/feeds', feedsRoutes);
    app.use('/api/validatefeedurl', validateFeedURLRoutes);
}