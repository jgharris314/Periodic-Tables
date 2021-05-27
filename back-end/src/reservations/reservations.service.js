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
    .insert(reservation, "*")
    .then((e) => e[0])
}

function listById(reservation_Id){
    return knex("reservations")
    .select("*")
    .where({reservation_id : reservation_Id })
    .then((e) => e[0])
}
const updateReservationStatus = (reservation_id, status) => {
    return knex("reservations")
      .update({ status }, "*")
      .where({ reservation_id })
      .then((e) => e[0]);
  };

 
  function update(reservation_id, updateData) {
    return knex("reservations")
      .update(updateData, "*")
      .where({ reservation_id })
      .then((e) => e[0]);
  }
  
  function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }
module.exports = {
    
    list,
    post,
    listById,
    listAll,
    updateReservationStatus,
    update,
    search
}