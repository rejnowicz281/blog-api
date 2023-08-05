const express = require("express");
const commentRouter = require("./comments");

const { index, show, create, update, destroy } = require("../controllers/postsController");

const router = express.Router();

router.use("/:postId/comments", commentRouter);
router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
