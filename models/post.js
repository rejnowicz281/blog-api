const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        body: {
            type: String,
            required: true,
            maxlength: 10000,
        },
    },
    { timestamps: true }
);

// Virtual for post's URL
postSchema.virtual("url").get(function () {
    return `/post/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", postSchema);
