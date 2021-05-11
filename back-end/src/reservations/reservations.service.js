const knex = require("../db/connection")

function list(){
    return knex("reservations as r")
    .select("*")
}

module.exports = {
    list,
}