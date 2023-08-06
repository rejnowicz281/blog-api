const jwt = require("jsonwebtoken");

const asyncHandler = require("../asyncHandler");

exports.login = asyncHandler(async (req, res, next) => {
    if (req.body.password === process.env.CMS_PASSWORD) {
        const token = jwt.sign({ password: req.body.password }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.json({ token });
    } else throw new Error("Incorrect password");
});
