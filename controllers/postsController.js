const debug = require("debug");

const logger = debug("app:postsController");

const asyncHandler = require("../asyncHandler");

const Post = require("../models/post");
const Comment = require("../models/comment");

const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });

    logger("Post Index successful");
    res.json(posts);
});

exports.show = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const post = await Post.findById(id);

    if (!post) return next(new Error("Post not found"));

    logger(post);
    res.json(post);
});

exports.create = [
    // Set up validators - title must not be empty and max length of 100, body must not be empty and max length of 10000, status is required and must be eithed "Draft" or "Published"
    body("title", "Post title must not be empty").trim().isLength({ min: 1, max: 100 }).escape(),
    body("body", "Post body must not be empty").trim().isLength({ min: 1, max: 10000 }).escape(),
    body("status", "Valid post status is required").trim().isIn(["Draft", "Published"]).escape(),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const post = new Post(req.body);

        await post.save();

        logger(post);
        res.json({ message: "Successful Create", post });
    }),
];

exports.update = [
    body("title", "Post title must not be empty").trim().isLength({ min: 1, max: 100 }).escape(),
    body("body", "Post body must not be empty").trim().isLength({ min: 1, max: 10000 }).escape(),
    body("status", "Valid post status is required").trim().isIn(["Draft", "Published"]).escape(),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const id = req.params.id;

        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

        if (!post) return next(new Error("Post not found"));

        logger(post);
        res.json({ message: "Successful Update", post });
    }),
];

exports.destroy = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const post = await Post.findByIdAndDelete(id);

    if (!post) return next(new Error("Post not found"));

    await Comment.deleteMany({ post: id });

    logger(post);
    res.json({ message: "Successful Destroy", id });
});
