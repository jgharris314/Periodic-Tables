import React, { Fragment } from "react";

export default function DashboardItem({date, reservations}) {
    
    return (
    <Fragment>
        <div className="row">
            {date}
        </div>
        <div className="row">
            <ul>
                {reservations.filter((e) => e.reservation_date === date)
                .map((e) => 
                <li>FirstName: {e.first_name} Last Name: {e.last_name} Seats: {e.people} Time: {e.reservation_time}</li>)}
            </ul>
        </div>
    </Fragment>
    )
} 