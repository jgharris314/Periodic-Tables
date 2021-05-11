const knex = require("../db/connection")

function list(){
    return knex("tables as t")
    .select("*")
}

module.exports = {
    list,
}