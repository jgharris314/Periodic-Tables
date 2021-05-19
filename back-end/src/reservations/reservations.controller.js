const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


const hasAllValidProperties = require("../errors/hasProperties")(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const hasValidReservationData = (req, res, next) => {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;
  const reserveDate = new Date(`${reservation_date}T${reservation_time}:00.000`);
  const dateIsValid = reservation_date.match(dateFormat)?.length > 0;
  const timeIsValid = reservation_time.match(timeFormat)?.length > 0;
  const peopleIsValid = typeof people === 'number'
  const todaysDate = new Date();

 
     
  if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
    return next({status:400, message: "Reservation cannot be made: Restaurant is not open until 10:30AM." });
  }
  else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
    return next({status: 400, message: "Reservation cannot be made: Restaurant is closed after 10:30PM." });
  }
  else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
  return next({status:400, message: "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM)." })
  } 
  if (dateIsValid && reserveDate.getDay() !== 2 && reserveDate >= todaysDate && timeIsValid && peopleIsValid) {
    next();
  }
  else {
    next({
      status: 400,
      message: "Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}"+ 
      "Restaurant cannot be closed, reservation must be in the future"
    });
  }
};

async function post(req, res, next) {
  res.status(201).json({ data: await service.post(req.body.data) });
}

async function list(req, res) {
  let reservations;
  if (req.query.date) {
    reservations = await service.list(req.query.date);
  } else {
    reservations = await service.listAll();
  }
  
  if (reservations.length > 1) {
    reservations = reservations.sort((a,b) => a.reservation_time.localeCompare(b.reservation_time))
  }

  res.json({ data: reservations });
}

module.exports = {
  list,
  post: [ hasAllValidProperties, hasValidReservationData,  asyncErrorBoundary(post)],
};
