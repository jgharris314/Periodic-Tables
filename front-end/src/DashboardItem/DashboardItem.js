import React, { useEffect, useState, Fragment } from "react";

export default function DashboardItem({date, reservations}) {
    
    return (
    <Fragment className="container">
        <div className="row">
            {date}
        </div>
        <div className="row">
            <ul>
                {reservations.filter((e) => e.reservation_date === date)
                .map((e) => 
                <li>FirstName: {e.first_name} Last Name: {e.last_name} Seats: {e.people}</li>)}
            </ul>
        </div>
    </Fragment>
    )
} 