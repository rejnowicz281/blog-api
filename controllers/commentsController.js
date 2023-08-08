const debug = require("debug");

const logger = debug("app:commentsController");

const asyncHandler = require("../asyncHandler");

const Comment = require("../models/comment");

const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId }).sort({
        createdAt: -1,
    });

    if (!comments) return next(new Error("Comments not found"));

    logger(comments);
    res.json(comments);
});

exports.show = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const comment = await Comment.findById(id);

    if (!comment) return next(new Error("Comment not found"));

    logger(comment);
    res.json(comment);
});

exports.create = [
    body("author", "Comment author must not be empty").trim().isLength({ min: 1, max: 100 }).escape(),
    body("body", "Comment body must not be empty").trim().isLength({ min: 1, max: 10000 }).escape(),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const postId = req.params.postId;

        const comment = new Comment({ ...req.body, post: postId });

        await comment.save();

        logger(comment);
        res.json({ message: "Successful Create", comment });
    }),
];

exports.destroy = asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const id = req.params.id;

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) return next(new Error("Comment not found"));

    logger(comment);
    res.json({ message: "Successful Delete", comment });
});
