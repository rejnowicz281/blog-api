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
        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        },
    },
    { timestamps: true }
);

// Virtual for comment's URL
commentSchema.virtual("url").get(function () {
    return `/blogs/${this.blog}/comments/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", commentSchema);
