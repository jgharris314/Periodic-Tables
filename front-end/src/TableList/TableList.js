import React from "react";
import {
  deleteReservationFromTable,
} from "../utils/api";
import './tableList.css'

export default function TableList({ tables, loadTables, refreshReservations }) {
  const finishHandler = async (table_id, reservation_id) => {
    const confirmed = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (confirmed) {
      await deleteReservationFromTable(table_id);
      loadTables();
      refreshReservations();
    }
  };

  return (
    <div className="container">
       <div className="row"> 
      {tables.map((e) => (
        <div className="col col-6 tableListCol" key={e.table_id}>
        <div className="card tableList">
          <div className="card-body tableCardBody">
          <p>Table Name {e.table_name}</p> 
          <p>Capacity {e.capacity}</p>
          <p data-table-id-status={e.table_id}>{e.reservation_id ? "Occupied" : "Free"}</p>
          {e.reservation_id ? (
            <button
              onClick={() => finishHandler(e.table_id)}
              data-table-id-finish={e.table_id}
              className="btn btn-danger"
            >
              Finish
            </button>
          ) : null}
          </div>
        </div>
        </div>
      ))}
      </div>
    </div>
  );
}
