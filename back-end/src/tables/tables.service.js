const knex = require("../db/connection")

function list(){
    return knex("tables as t")
    .select("*")
    .orderBy("t.table_name")
}

function post(table){
    return knex("tables as t")
    .insert(table, "*")
    .then((e) => e[0])
}

function read(table_id){
    return knex("tables as t")
    .select("*")
    .where({table_id: table_id})
    .then((e) => e[0])
}

function update(table){
    return knex("tables as t")
    .where({table_id: table.table_id})
    .update(table, "*")
}

function removeReservationFromTable(table_id){
    return knex("tables")
    .update({ reservation_id: null }, "*")
    .where({ table_id })
    .then((tables) => tables[0]);
}

module.exports = {
    read,
    list,
    post,
    update,
    removeReservationFromTable,
}