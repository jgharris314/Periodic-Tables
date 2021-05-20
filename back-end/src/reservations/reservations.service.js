const knex = require("../db/connection")

function list(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date });
  }

function listAll(){
    return knex("reservations")
    .select("*")
}

function post(reservation){
    return knex("reservations as r")
    .insert(reservation, "*").then((e) => e[0])
}

function listById(reservation_Id){
    return knex("reservations")
    .select("*")
    .where({reservation_id : reservation_Id }).then((e) => e[0])
}

module.exports = {
    list,
    post,
    listById,
    listAll,
}