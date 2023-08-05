const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
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

// Virtual for blog's URL
blogSchema.virtual("url").get(function () {
    return `/blog/${this._id}`;
});

// Export model
module.exports = mongoose.model("Blog", blogSchema);
