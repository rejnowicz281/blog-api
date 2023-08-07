const debug = require("debug");

const logger = debug("app:postsController");

const asyncHandler = require("../asyncHandler");

const Post = require("../models/post");
const Comment = require("../models/comment");

exports.index = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });

    logger(posts);
    res.json(posts);
});

exports.show = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const post = await Post.findById(id);

    if (!post) return next(new Error("Post not found"));

    logger(post);
    res.json(post);
});

exports.create = asyncHandler(async (req, res) => {
    const post = new Post(req.body);

    await post.save();

    logger(post);
    res.json({ message: "Successful Create", post });
});

exports.update = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

    if (!post) return next(new Error("Post not found"));

    logger(post);
    res.json({ message: "Successful Update", post });
});

exports.destroy = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const post = await Post.findByIdAndDelete(id);

    if (!post) return next(new Error("Post not found"));

    await Comment.deleteMany({ post: id });

    logger(post);
    res.json({ message: "Successful Destroy", id });
});
