const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.destroy)
    .all(methodNotAllowed);

module.exports = router;