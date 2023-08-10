import mongoose from "mongoose";

const socialMediaAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    platform: { type: String, required: true },
    accessToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const SocialMediaAccount = mongoose.model('SocialMediaAccount', socialMediaAccountSchema);
export default SocialMediaAccount;