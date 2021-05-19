import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import  DashboardItem  from "../DashboardItem/DashboardItem";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <div className="row">
        <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
        <button onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row">
        <DashboardItem date={date} reservations={reservations}/>
      </div>
    </main>
  );
}

export default Dashboard;
