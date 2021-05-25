import React, {useState, useEffect} from "react";

import { Redirect, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Tables from "../tables/Tables"
import NewReservation from "../NewReservation/NewReservation"
import Search from "../Search/Search"
import NewTable from "../NewTable/NewTable"
import useQuery from "../utils/useQuery"
import SeatForm from "../SeatForm/SeatForm"
import {listReservations, listTables} from "../utils/api"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const query = useQuery();
  const date = query.get("date")
  const {url} = useRouteMatch()
  //Code from Dashboard
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
 

  const history = useHistory();
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null)
    listReservations( date ? date : today() , abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError)
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    return listTables(abortController.signal).then(setTables).catch(setTablesError);
  }

  function refreshReservations() {
    setReservationsError(null);
    return listReservations({ date }).then(setReservations).catch(setReservationsError);
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatForm reservations={reservations} tables={tables} loadTables={loadTables} refreshReservations={refreshReservations}/>
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          date = {date ? date : today()} 
          reservations={reservations}
          reservationsError={reservationsError}
          tables={tables}
          tablesError={tablesError}
          loadTables={loadTables}
          refreshReservations={refreshReservations}
          />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/tables" exact>
        <Tables />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
