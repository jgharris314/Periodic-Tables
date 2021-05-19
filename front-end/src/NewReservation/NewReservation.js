import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api"
import { today } from "../utils/date-time"
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
  const [errors, setErrors] = useState([]);

  function validDate() {
    const foundErrors = []
    const reserveDate = new Date(`${formData.reservation_date}T${formData.reservation_time}:00.000`);
		const todaysDate = new Date();
    if (reserveDate.getDay() === 2){
      foundErrors.push({ message: "Reservations cannot be made on a Tuesday (Restaurant is closed)." })
    }

    if(reserveDate < todaysDate) {
			foundErrors.push({ message: "Reservation cannot be made: Date is in the past." });
		}

		if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
			foundErrors.push({ message: "Reservation cannot be made: Restaurant is not open until 10:30AM." });
		}
		else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
			foundErrors.push({ message: "Reservation cannot be made: Restaurant is closed after 10:30PM." });
		}
		else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
			foundErrors.push({ message: "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM)." })
		}

    setErrors(foundErrors)
    return foundErrors.length > 0
  }

  function validField() {
    const foundErrors = []
    for(const field in formData) {
			if(formData[field] === "") {
				foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
			}
		}

		return foundErrors.length > 0;
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const peopleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: Number(target.value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validDate() && !validField()){
      console.log(formData)
      await createReservation(formData).then((x) =>
      history.push(`/dashboard?date=${formData.reservation_date}`))
    }
    
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData({ ...initialFormData });
    history.goBack()
  };

  const errorsJSX = () => {
    return errors.map((error, index) => <ErrorAlert key={index} error={error}/>);
  }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      {errorsJSX()}
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
                onChange={peopleChange}
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
    </div>
  );
}
