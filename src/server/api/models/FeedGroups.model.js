import mongoose from "mongoose";

const FeedGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must include a group name."]
    },
    order: {
        type: Number
    }
});

export default mongoose.model("FeedGroups", FeedGroupSchema);