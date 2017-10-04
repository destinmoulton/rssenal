import parser from "rss-parser";

class ValidateFeedURL {
    
    validate_single(req, res){
        // Validate that the url is accessible
        const data = req.body;
        parser.parseURL(data.feedURL, (err, valres, body)=>{
            if(err){
                res.json({status:"error", error:err});
            }

            res.json({
                status:"success",
                feedInfo: valres
            });
        });
    }
}

export default new ValidateFeedURL();