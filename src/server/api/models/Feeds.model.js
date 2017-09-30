import mongoose from "mongoose";
import request from "request";

const FeedSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The feed name is required."]
    },
    url: {
        type: String,
        required: [true, "The feed url is required."],
        validate: {
            isAsync: true,
            validator: (v, cb)=>{
                // Validate that the url is accessible
                request(v, (err, res, body)=>{
                    let isValid = true;
                    let msg = "";
                    if(err || res.statusCode !== 200){
                        isValid = false;
                        msg = "There was an issue accessing the feed URL.";
                    }
                    cb(isValid, msg);
                });              
            }
        }
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date
    }
});

export default mongoose.model("Feeds", FeedSchema);