import mongoose from "mongoose";

const FeedCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must include a category name."]
    }
});

export default mongoose.model("FeedCategories", FeedCategorySchema);