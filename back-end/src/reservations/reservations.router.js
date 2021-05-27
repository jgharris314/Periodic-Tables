/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router
    .route("/:reservation_id/edit")
        .put(controller.update)
        .all(methodNotAllowed)

router
    .route("/:reservation_id/status")
        .put(controller.updateReservationStatus)
        .all(methodNotAllowed)
router
    .route("/:reservation_id")
        .get(controller.listById)
        .put(controller.update)
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
