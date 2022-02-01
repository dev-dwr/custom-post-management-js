import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    author: String,
    tags: [String],
    selectedFiles: String,
    likes: {
        type: [String], 
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    comments:{
        type: [String],
        default: []
    }
})

export default mongoose.model("Post", postSchema);