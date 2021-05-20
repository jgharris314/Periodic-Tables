/**
 * Defines the router for table resources
 * 
 * @type {Router}
 */
const methodNotAllowed = require("../errors/methodNotAllowed")
const router = require("express").Router();
const controller = require("./tables.controller");

router
    .route("/:table_id/seat")
        .put(controller.put)

router
    .route("/new")
    .post(controller.post)
    .get(controller.list)
    .all(methodNotAllowed)

router
    .route("/")
    .post(controller.post)
    .get(controller.list)
    .all(methodNotAllowed)

    module.exports = router;