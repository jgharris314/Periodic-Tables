import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api"
/**
 * Defines the NewReservation page.
 * @param
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

export default function NewReservation() {
  const history = useHistory();

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createReservation(formData)
    .then((res) => history.push("/dashboard"))
    setFormData({...initialFormData})
    console.log("im kinda doin somethig")
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData({ ...initialFormData });
    //Check to see this is what is wanted
    history.go(0);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h3>Create a new Reservation</h3>
        <div className="container">
          <div className="row">
            <label htmlFor="first_name">
              First Name:
              <input
                id="first_name"
                type="text"
                name="first_name"
                onChange={handleChange}
                value={formData.first_name}
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
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="mobile_number">
              Mobile Number:
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                onChange={handleChange}
                value={formData.mobile_number}
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="reservation_date">
              Reservation Date
              <input
                id="reservation_date"
                type="text"
                name="reservation_date"
                onChange={handleChange}
                value={formData.reservation_date}
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="reservation_time">
              Reservation Time
              <input
                id="reservation_time"
                type="text"
                name="reservation_time"
                onChange={handleChange}
                value={formData.reservation_time}
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="people">
              Number of People
              <input
                id="people"
                //still undecided on the exact type i wanna use
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
        </div>
      </form>
    </Fragment>
  );
}
