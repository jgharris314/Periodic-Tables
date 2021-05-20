import React, {} from "react";

export default function TableList({tables}) {
    return (
        <div>
            {tables.map((e) => <li>Name {e.table_name} Capacity {e.capacity}  {e.status ? "Occupied":"Free"  }</li>)}
        </div>
    )
}