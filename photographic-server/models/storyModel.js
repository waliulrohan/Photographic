const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const storySchema = new Schema({
    photo: {
        type: String,
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "USER",
    },
}, { 
    timestamps: true 
});

// Set up TTL index for automatic deletion after 24 hours
storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const STORY = mongoose.model("STORY", storySchema);

module.exports = STORY;
