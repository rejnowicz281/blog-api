const debug = require("debug");

const logger = debug("app:blogsController");

const asyncHandler = require("../asyncHandler");

const Blog = require("../models/blog");

exports.index = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json(blogs);
});

exports.show = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
});

exports.create = asyncHandler(async (req, res) => {
    const blog = new Blog(req.body);

    await blog.save();

    res.json({ message: "Successful Create", blog });
});

exports.update = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Successful Update", blog });
});

exports.destroy = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Successful Destroy", id });
});
