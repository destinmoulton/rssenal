import mongoose from "mongoose";

const FeedSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "The feed title is required."]
    },
    feedgroup_id: {
        type: String
    },
    url: {

    },
    description: {
        type: String
    },
    link: {
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