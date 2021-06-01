import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useParams } from "react-router-dom";
import { getReservationById, seatReservation } from "../utils/api";
import './seatForm.css'
import formatReservationDate from "../utils/format-reservation-date";

export default function SeatForm({
  reservations,
  tables,
  loadTables,
  refreshReservations,
}) {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [reservationState, setReservationState] = useState({});

  function loadReservation() {
    const abortController = new AbortController();
    setError(null);
    getReservationById(reservation_id, abortController.signal)
      .then(setReservationState)
      .catch(setError);
    return () => abortController.abort;
  }

  useEffect(loadReservation, [reservation_id]);

  const validData = () => {
    const errors = [];
    let isValid = true;
    const table = tables.find((table) => table.table_id === Number(tableId));

    if (reservationState.people > table.capacity) {
      errors.push({ message: "Party size exceeds table capacity" });
      isValid = false;
    }

    if (table.reservation_id) {
      errors.push({ message: "Table is occupied" });
      isValid = false;
    }
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validData()) {
      try {
        await seatReservation(reservation_id, tableId);
        await loadTables();
        await refreshReservations();
        formatReservationDate(reservationState);
        history.push(`/dashboard?date=${reservationState.reservation_date}`);
      } catch (e) {
        setError(e);
      }
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const onChangeHandler = (event) => {
    setTableId(event.target.value);
  };

  return (
    <div className = "conainer">
      <div className="card seatFormCard">
        <div className="card-body seatFormCardBody">
      <h3>
        Choose a table for Party: {reservationState.last_name} People:{" "}
        {reservationState.people}
      </h3>
      
      
      {validationErrors.map((valError, index) => (
        <ErrorAlert key={index} error={valError} />
      ))}
      <form onSubmit={handleSubmit}>
        
        <select
          name="table_id"
          id="table_name"
          onChange={onChangeHandler}
          value={tableId}
        >
          <option defaultValue={0}>Select Table</option>
          {tables.map(({ table_id, table_name, capacity }) => (
            <option
              key={table_id}
              value={table_id}
            >{`${table_name} - ${capacity}`}</option>
          ))}
        </select>
        
        
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
        
      </form>
      
      </div>
      </div>
      <ErrorAlert error={error} />
    </div>
  );
}
