/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router
    .route("/:reservation_id")
        .get(controller.listById)
        .all(methodNotAllowed)

router
    .route("/new")
        .post(controller.post)
        .all(methodNotAllowed)
router
    .route("/")
        .get(controller.list)
        .post(controller.post)
        .all(methodNotAllowed)
module.exports = router;
