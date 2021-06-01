import React from "react";
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
    <div className="dashboard">
    <main className="container-fluid">
      <div className="dashboardSection">
        <div className="d-md-flex mb-3 justify-content-center dashboardHeader">
          <h1 className="">Dashboard</h1>
        </div>

        <div className="d-md-flex mb-3 justify-content-center dashboardSecondary">
          <h2 className="mb-0 ">Reservations for date {date}</h2>
        </div>
        <div className="d-md-flex mb-3 justify-content-center dashboardButtons ">
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
        </div>
        {/* <ErrorAlert error={reservationsError} /> */}
        <div className="dashboardList">
         
          <DashboardItem date={date} reservations={reservations} refreshReservations={refreshReservations}/>
        </div>
        <div className="tableListSection">
          <h2>Tables</h2>
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
