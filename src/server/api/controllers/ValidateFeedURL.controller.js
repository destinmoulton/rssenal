import request from "request";

class ValidateFeedURL {
    
    validate_single(req, res){
        // Validate that the url is accessible
        request(req.params.feedUrl, (err, res, body)=>{
            let status = "success";
            if(err || res.statusCode !== 200){
                status = "error";
            }

            res.json({status});
        });
    }
}