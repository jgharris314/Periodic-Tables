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

  const dateIsValid = reservation_date.match(dateFormat)?.length > 0;
  const timeIsValid = reservation_time.match(timeFormat)?.length > 0;
  const peopleIsValid = typeof people === 'number'

  if (dateIsValid && timeIsValid && peopleIsValid) {
     next();
  } else {
    next({
      status: 400,
      message: "Invalid data format provided. Requires {string: [first_name, last_name, mobile_number], date: reservation_date, time: reservation_time, number: people}"
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
