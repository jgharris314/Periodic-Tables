const knex = require("../db/connection")

function list(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date });
  }

function post(reservation){
    return knex("reservations as r")
    .insert(reservation, "*").then((e) => e[0])
}

module.exports = {
    list,
    post
}