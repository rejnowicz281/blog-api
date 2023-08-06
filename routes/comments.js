const express = require("express");
const passport = require("passport");

const { index, show, create, destroy } = require("../controllers/commentsController");

const router = express.Router({ mergeParams: true });

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.delete("/:id", passport.authenticate("jwt", { session: false }), destroy);

module.exports = router;
