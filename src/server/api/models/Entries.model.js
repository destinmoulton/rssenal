import mongoose from "mongoose";

const EntrySchema = mongoose.Schema({
    feed_id: {
        type: String
    },
    guid: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    creator: {
        type: String
    },
    content: {
        type: String
    },
    content_snippet: {
        type: String
    },
    publish_date: {
        type: Date
    },
    has_read: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Entries", EntrySchema);