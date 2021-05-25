import React from "react";
import {
  deleteReservationFromTable,
} from "../utils/api";

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
    <div>
        
      {tables.map((e) => (
        <li>
          Name {e.table_name} Capacity {e.capacity}{" "}
          <p data-table-id-status={e.table_id}>{e.reservation_id ? "Occupied" : "Free"}</p>
          {e.reservation_id ? (
            <button
              onClick={() => finishHandler(e.table_id)}
              data-table-id-finish={e.table_id}
            >
              Finish
            </button>
          ) : null}
        </li>
      ))}
    </div>
  );
}
