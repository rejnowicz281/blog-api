const express = require("express");
const commentRouter = require("./comments");
const passport = require("passport");

const { index, show, create, update, destroy } = require("../controllers/postsController");

const router = express.Router();

router.use("/:postId/comments", commentRouter);
router.get("/", index);
router.get("/:id", show);
router.post("/", passport.authenticate("jwt", { session: false }), create);
router.put("/:id", passport.authenticate("jwt", { session: false }), update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), destroy);

module.exports = router;
