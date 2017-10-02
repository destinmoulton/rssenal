import request from "request";

class ValidateFeedURL {
    
    validate_single(req, res){
        // Validate that the url is accessible
        const data = req.body;
        request(data.feedURL, (err, valres, body)=>{
            let status = "success";
            if(err || valres.statusCode !== 200){
                status = "error";
            }

            res.json({status});
        });
    }
}

export default new ValidateFeedURL();