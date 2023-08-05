if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// const rateLimit = require("express-rate-limit");
const compression = require("compression");
const debug = require("debug");
const express = require("express");
const helmet = require("helmet");
const createError = require("http-errors");
const mongoose = require("mongoose");

const blogRouter = require("./routes/blogs");

const app = express();

const logger = debug("app:db");

// connect to mongodb && listen for requests
const URI = process.env.MONGOD_URI || "mongodb://localhost:27017/blog";

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const server = app.listen(3000);

        logger("Connected to DB");
        logger(server.address());
    })
    .catch((err) => {
        logger(err);
    });

// middleware and static files
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//     rateLimit({
//         windowMs: 1 * 60 * 1000, // 1 minute
//         max: 200,
//     })
// );

// routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});
app.use("/blogs", blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    logger(err);

    let error = { message: err.message, status: err.status };

    if (req.app.get("env") === "development") error.stack = err.stack;

    res.status(err.status || 500).json({ error });
});
