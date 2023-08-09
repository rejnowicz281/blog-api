const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
            maxlength: 100,
        },
        body: {
            type: String,
            required: true,
            maxlength: 10000,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

// Virtual for comment's URL
commentSchema.virtual("url").get(function () {
    return `/posts/${this.post}/comments/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", commentSchema);
