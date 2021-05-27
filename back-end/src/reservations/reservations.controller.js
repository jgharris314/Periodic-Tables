const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function validateNewReservationProperties(req, res, next) {
  const REQUIRED_PROPS = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  const newReservation = req.body.data;
  if (!newReservation) {
    return next({
      status: 400,
      message:
        "Couldn't find data. Make sure you have a data key in your request body.",
    });
  }

  const missingProps = REQUIRED_PROPS.filter(
    (prop) => newReservation[prop] === undefined
  );

  if (missingProps.length) {
    return next({
      status: 400,
      message: `Please provide the following props: ${missingProps.join(", ")}`,
    });
  }

  for (let prop in newReservation) {
    if (prop !== "people" && prop !== "reservation_id") {
      if (!newReservation[prop].length) {
        return next({
          status: 400,
          message: `${prop} cannot be empty. ${prop}: ${newReservation[prop]}`,
        });
      }
    }
  }

  const timeStamp = Date.parse(newReservation.reservation_date);
  if (isNaN(timeStamp)) {
    return next({
      status: 400,
      message: "reservation_date is not a valid date",
    });
  }

  const timeFormat = /\d\d:\d\d/;
  const time = newReservation.reservation_time;
  if (!time.match(timeFormat)) {
    return next({
      status: 400,
      message: "reservation_time is not a valid time",
    });
  }

  const people = newReservation.people;
  if (typeof people !== "number" || people < 1) {
    return next({
      status: 400,
      message: "people is not valid",
    });
  }

  const date = new Date(
    `${newReservation.reservation_date}T${newReservation.reservation_time}:00`
  );
  if (date.getDay() === 2) {
    return next({
      status: 400,
      message: "Invalid date. The restaurant is closed on Tuesdays",
    });
  }

  const todaysDate = new Date();
  if (date < todaysDate) {
    return next({
      status: 400,
      message: "Invalid date. Please select a date from the future.",
    });
  }

  const hours = date.getHours();
  const mins = date.getMinutes();
  if (hours < 10 || (hours === 10 && mins < 30)) {
    return next({
      status: 400,
      message: "Cannot reserve a time before the restaurant opens at 10:30am",
    });
  }

  if ((hours === 21 && mins > 30) || (hours === 22 && mins < 30)) {
    return next({
      status: 400,
      message:
        "Cannot reserve a time after 9:30 PM. Too close to closing time.",
    });
  }

  if (hours > 22 || (hours === 22 && mins >= 30)) {
    return next({
      status: 400,
      message:
        "Cannot reserve a time after 10:30 PM. Restaurant closes at 10:30 PM.",
    });
  }

  if (
    newReservation.status === "seated" ||
    newReservation.status === "finished"
  ) {
    return next({
      status: 400,
      message: `Reservation status cannot be '${newReservation.status}'. Status must be 'booked' `,
    });
  }

  next();
}

async function post(req, res, next) {
  res.status(201).json({ data: await service.post(req.body.data) });
}

async function list(req, res) {
 
  const { mobile_number } = req.query;
  if (mobile_number) {
    const searchResults = await service.search(mobile_number);
    return res.json({ data: searchResults });
  }
  let reservations;
  if (req.query.date) {
    reservations = await service.list(req.query.date);
  } else {
    reservations = await service.listAll();
  }

  if (reservations.length > 1) {
    reservations = reservations.sort((a, b) =>
      a.reservation_time.localeCompare(b.reservation_time)
    );
  }

  res.json({ data: reservations.filter((x) => x.status !== "finished") });
}

async function listById(req, res) {
  const reservation = await service.listById(req.params.reservation_id);
  res.json({ data: reservation });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.listById(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation ID ${reservation_id} cannot be found`,
  });
}

function validateStatus(req, res, next) {
  const { status } = req.body.data;

  const VALID_STATUSES = ["booked", "seated", "finished", "cancelled"];

  if (!VALID_STATUSES.includes(status)) {
    return next({ status: 400, message: `Unknown ${status}` });
  }

  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: `This reservation has already been finished.`,
    });
  }
  next();
}

async function updateReservationStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;

  const data = await service.updateReservationStatus(
    Number(reservation_id),
    status
  );

  res.json({ data });
}

async function update(req, res, next) {
  const updateData = req.body.data;
  const { reservation_id } = req.params;
  const data = await service.update(Number(reservation_id), updateData);

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  post: [validateNewReservationProperties, asyncErrorBoundary(post)],
  listById: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(listById),
  ],
  updateReservationStatus: [
    asyncErrorBoundary(reservationExists),
    validateStatus,
    asyncErrorBoundary(updateReservationStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    validateNewReservationProperties,
    asyncErrorBoundary(update),
  ],
};
