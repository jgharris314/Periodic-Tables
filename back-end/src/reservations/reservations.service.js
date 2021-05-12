const knex = require("../db/connection")

function list(){
    return knex("reservations as r")
    .select("*")
}

function post(reservation){
    return knex("reservations as r")
    .insert(reservation, "*")
}

module.exports = {
    list,
    post
}