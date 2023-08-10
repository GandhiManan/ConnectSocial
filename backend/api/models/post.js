import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    platform: { type: String, required: true },
    title: { type: String, required: false },
    content: { type: String, required: true },
    postUrl: { type: String, required: false },
    imageUrl: { type: String, required: false },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const PostUploaded = mongoose.model('Post', postSchema);
export default PostUploaded;