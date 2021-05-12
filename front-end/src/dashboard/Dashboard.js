import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import  DashboardItem  from "../DashboardItem/DashboardItem";
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
  const [dateState, setDateState] = useState("")


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setDateState(date)
    listReservations({ dateState }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {dateState}</h4>
      </div>
      <div className="row">
        <button onClick={() => setDateState(previous(dateState))}>Previous</button>
        <button onClick={() => setDateState(today())}>Today</button>
        <button onClick={() => setDateState(next(dateState))}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row">
        <DashboardItem date={dateState} reservations={reservations}/>
      </div>
    </main>
  );
}

export default Dashboard;
