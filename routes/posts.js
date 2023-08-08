const express = require("express");
const commentRouter = require("./comments");
const passport = require("passport");

const { index, show, create, update, destroy, publicIndex } = require("../controllers/postsController");

const router = express.Router();

router.use("/:postId/comments", commentRouter);
router.get("/", passport.authenticate("jwt", { session: false }), index);
router.get("/public", publicIndex);
router.get("/:id", show);
router.post("/", passport.authenticate("jwt", { session: false }), create);
router.put("/:id", passport.authenticate("jwt", { session: false }), update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), destroy);

module.exports = router;
