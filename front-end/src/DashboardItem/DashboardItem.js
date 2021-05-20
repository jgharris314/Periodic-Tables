import React, { Fragment } from "react";
import { seatReservation, Link } from "react-router-dom"

export default function DashboardItem({date, reservations}) {
    
    return (
    <Fragment>
        <div className="row">
        </div>
        <div className="row">
            <ul>
                {reservations.filter((e) => e.reservation_date === date)
                .map((e) => 
                <li>FirstName: {e.first_name} 
                Last Name: {e.last_name} 
                Seats: {e.people} 
                Time: {e.reservation_time}
               <Link to={`/reservations/${e.reservation_id}/seat`}>Seat</Link>
                </li>)}
            </ul>
        </div>
    </Fragment>
    )
} 