const knex = require("../db/connection")

function list(){
    return knex("tables as t")
    .select("*")
    .orderBy("t.table_name")
}

function post(table){
    return knex("tables as t")
    .insert(table, "*").then((e) => e[0])
}

function put(table){
    console.log(table)
}

module.exports = {
    list,
    post,
    put,
}