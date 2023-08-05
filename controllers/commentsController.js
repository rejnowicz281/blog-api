const debug = require("debug");

const logger = debug("app:commentsController");

const asyncHandler = require("../asyncHandler");

const Comment = require("../models/comment");

exports.index = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId }).sort({
        createdAt: -1,
    });

    if (!comments) return res.status(404).json({ message: "Comments not found" });

    res.json(comments);
});

exports.show = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const comment = await Comment.findById(id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json(comment);
});

exports.create = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const comment = new Comment({ ...req.body, post: postId });

    await comment.save();

    res.json({ message: "Successful Create", comment });
});

exports.destroy = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json({ message: "Successful Delete", comment });
});
