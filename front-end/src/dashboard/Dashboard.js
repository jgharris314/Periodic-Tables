import React, { useEffect, useState } from "react";
import DashboardItem from "../DashboardItem/DashboardItem";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import TableList from "../TableList/TableList";
import './dashboard.css'
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  reservations,
  tables,
  reservationsError,
  tablesError,
  loadTables,
  refreshReservations,
}) {
  const history = useHistory();

  return (
    <div className="container dashboard">
      <main>
        <div className="row d-md-flex mb-3">
          <h1 className="dashboardHeader">Dashboard</h1>
        </div>

        <div className="row d-md-flex mb-3">
          <h4 className="mb-0 dashboardSecondary">Reservations for date {date}</h4>
        </div>
        <div className="row">
          <button
            onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <button onClick={() => history.push(`/dashboard?date=${today()}`)}
          className="btn btn-primary"
          >
            Today
          </button>
          <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}
          className="btn btn-secondary"
          >
            Next
          </button>
        </div>
        {/* <ErrorAlert error={reservationsError} /> */}
        <div className="row">
          <DashboardItem date={date} reservations={reservations} refreshReservations={refreshReservations}/>
        </div>
        <div className="row">
          <TableList
            tables={tables}
            loadTables={loadTables}
            refreshReservations={refreshReservations}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
