import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation, getReservationById, updateReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
/**
 * Defines the NewReservation page.
 * @param
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

export default function NewReservation({refreshReservations, loadReservations}) {
  const history = useHistory();
  const {reservation_id} = useParams();

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };


  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (reservation_id) {
      getReservationById(reservation_id)
        .then((reservation) => {
          formatReservationDate(reservation);

          setFormData({
            first_name: reservation.first_name,
            last_name: reservation.last_name,
            mobile_number: reservation.mobile_number,
            reservation_date: reservation.reservation_date,
            reservation_time: reservation.reservation_time,
            people: reservation.people,
          });
        })
        .catch(setErrors);
    } else {
      setFormData({
        ...initialFormData
      });
    }
  }, [reservation_id]);

  function validDate() {
    const foundErrors = [];
    const reserveDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const todaysDate = new Date();
    if (reserveDate.getDay() === 2) {
      foundErrors.push({
        message:
          "Reservations cannot be made on a Tuesday (Restaurant is closed).",
      });
    }

    if (reserveDate < todaysDate) {
      foundErrors.push({
        message: "Reservation cannot be made: Date is in the past.",
      });
    }

    if (
      reserveDate.getHours() < 10 ||
      (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    } else if (
      reserveDate.getHours() > 22 ||
      (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed after 10:30PM.",
      });
    } else if (
      reserveDate.getHours() > 21 ||
      (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });
    }

    setErrors(foundErrors);
    return foundErrors.length > 0;
  }

  function validField() {
    const foundErrors = [];
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push({
          message: `${field.split("_").join(" ")} cannot be left blank.`,
        });
      }
    }

    return foundErrors.length > 0;
  }

  const handleChange = ({ target }) => {
    const value =
      target.name === "people" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validDate() && !validField()) {
      if(!reservation_id){
      await createReservation(formData).then((x) =>
        history.push(`/dashboard?date=${formData.reservation_date}`)
      )}else{
        const updatedReservation = await updateReservation(reservation_id, {
          data: { ...formData, status: "booked" },
        });
        await refreshReservations();
        formatReservationDate(updatedReservation)
        history.push(`/dashboard?date=${updatedReservation.reservation_date}`)
      }
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData({ ...initialFormData });
    history.goBack();
  };

  const errorsJSX = () => {
    return errors.map((error, index) => (
      <ErrorAlert key={index} error={error} />
    ));
  };
  return (
    <div className="container">
      <div className="row">
        <h3>Create a new Reservation</h3>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit}>
          {errorsJSX()}

          <div className="row">
            <label htmlFor="first_name">
              First Name:
              <input
                id="first_name"
                type="text"
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="last_name">
              Last Name:
              <input
                id="last_name"
                type="text"
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="mobile_number">
              Mobile Number:
              <input
                id="mobile_number"
                type="tel"
                placeholder="012-345-6789"
                name="mobile_number"
                onChange={handleChange}
                value={formData.mobile_number}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="reservation_date">
              Reservation Date
              <input
                id="reservation_date"
                type="date"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
                name="reservation_date"
                onChange={handleChange}
                value={formData.reservation_date}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="reservation_time">
              Reservation Time
              <input
                id="reservation_time"
                type="time"
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
                name="reservation_time"
                onChange={handleChange}
                value={formData.reservation_time}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="people">
              Number of People
              <input
                id="people"
                type="number"
                name="people"
                onChange={handleChange}
                value={formData.people}
              />
            </label>
          </div>
          <div className="row">
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
