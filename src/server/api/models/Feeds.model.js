import mongoose from "mongoose";

const FeedSchema = mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String
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