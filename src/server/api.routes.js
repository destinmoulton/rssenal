import feedsRoutes from "./api/routes/Feeds.route";

export default function(app){
    app.use('/api/feeds', feedsRoutes);
}