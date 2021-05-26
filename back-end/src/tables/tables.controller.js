const service = require("./tables.service")
const reservationService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res) {
    const data = await service.list()
    res.json({data})
}

async function post(req,res){
    res.status(201).json({data: await service.post(req.body.data)})
}

async function update(req, res){
    const { reservation_id } = req.body.data;
    await reservationService.updateReservationStatus(Number(reservation_id), "seated");
    res.json({data: await service.update(res.locals.table)})
}

const hasValidTableData = (req, res, next) => {
    const { data } = req.body;
    if(!data) return next({status:400, message: "no data"})
    const { table_name, capacity } = req.body.data;

    if(!table_name || table_name.length < 2 ){
        return next({status: 400, message: 'table_name must be longer tan 2 characters'})
    }
    if(!capacity || capacity === 0 || typeof capacity !== "number"){
        return next({status: 400, message: 'capacity must be a number greater than 0'})
    }
    res.locals.table = data;
    next();
}

const reservationExists = async (req, res, next) => {
    const { data } = req.body;
    if(!data) return next({status: 400, message: "No data"});

    const resId = data.reservation_id;
    res.locals.reservation_id = resId;
    if(!resId) return next({status: 400, message: "No reservation_id"})

    const reservation = await reservationService.listById(resId);
    if(!reservation) return next({status: 404, message: `The reservation_id: ${resId} does not exist.`})
    else{
        res.locals.reservation = reservation;
        return next();
    }
}

const tableExists = async(req,res,next) => {
    const { table_id } = req.params;
    const table = await service.read(table_id)

    if(table){
        res.locals.table = table;
        return next();
    }else{
        return next({status: 404, message: `table_id: ${table_id} does not exist`})
    }
}

const tableIsAvailable = async(req,res,next) => {
    const table = res.locals.table;
  if (!table) return next({status: 404, message: `table_id: ${table_id} does not exist`});
  
  const reservation = res.locals.reservation;
  if (table.reservation_id) return next({status: 400, message: "Table is currently occupied/unavailable."})
  
  if (reservation.people > table.capacity) return next({status: 400, message: "Reservation party size is too large for table capacity."})
  if(reservation.status === "seated") return next({status: 400, message: "Reservation has already been seated."})
  table.reservation_id = res.locals.reservation_id;
  next();
}

const tableIsOccupied = (req, res, next) => {
    const table = res.locals.table

    if(table.reservation_id === null){
        return next({status: 400, message: `Table is not occupied`})
    }
    next();
}

const removeReservation = async (req, res, next) => {
    const table = res.locals.table
    const reservation_id = table.reservation_id

    await service.removeReservationFromTable(table.table_id);
    const data = await reservationService.updateReservationStatus(
    Number(reservation_id),
    "finished"
  );

  res.json({ data });

}

module.exports = {
    list,
    post: [ hasValidTableData, asyncErrorBoundary(post), ],
    put: [ asyncErrorBoundary(reservationExists), asyncErrorBoundary(tableExists), asyncErrorBoundary(tableIsAvailable), asyncErrorBoundary(update), ],
    removeReservation: [asyncErrorBoundary(tableExists), tableIsOccupied, asyncErrorBoundary(removeReservation)]
}