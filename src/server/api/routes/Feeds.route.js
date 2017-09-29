
import feeds from "../controllers/Feeds.controller";

export default function(app){
    app.route('/feeds')
       .get(feeds.get_all)
       .post(feeds.add);

    app.route('/feeds/:feedId')
       .get(feeds.get_single)
       .delete(feeds.delete_single);
}