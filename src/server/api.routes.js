import entryRoutes from "./api/routes/Entries.route";
import folderRoutes from "./api/routes/Folders.route"
import feedsRoutes from "./api/routes/Feeds.route";
import validateFeedURLRoutes from "./api/routes/ValidateFeedURL.route";

export default function(app){
    app.use('/api/entries', entryRoutes);
    app.use('/api/folders', folderRoutes);
    app.use('/api/feeds', feedsRoutes);
    app.use('/api/validatefeedurl', validateFeedURLRoutes);
}