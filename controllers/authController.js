const jwt = require("jsonwebtoken");
const debug = require("debug");

const logger = debug("app:authController");

const asyncHandler = require("../asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
    if (req.body.password === process.env.CMS_PASSWORD) {
        const token = jwt.sign({ password: req.body.password }, process.env.JWT_SECRET, {
            expiresIn: "6h",
        });

        logger(token);
        return res.json({ token });
    } else {
        logger("Incorrect password");
        throw new Error("Incorrect password");
    }
});
