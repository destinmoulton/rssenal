import mongoose from "mongoose";

const FolderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must include a folder name."]
    },
    order: {
        type: Number
    }
});

export default mongoose.model("Folders", FolderSchema);
