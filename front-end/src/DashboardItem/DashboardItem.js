import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";

export default function DashboardItem({ date, reservations }) {
  const history = useHistory();
  return (
    <Fragment>
      <div className="row"></div>
      <div className="row">
        <ul>
          {reservations
            .filter((e) => e.reservation_date === date)
            .map(
              ({
                first_name,
                last_name,
                people,
                reservation_time,
                status,
                reservation_id,
              }) => (
                <li>
                  FirstName: {first_name}
                  Last Name: {last_name}
                  Seats: {people}
                  Time: {reservation_time}
                  Status: {status}
                  {status === "booked" ? (
                    <Link to={`/reservations/${reservation_id}/seat`}>
                      Seat
                    </Link>
                  ) : (
                    "Something"
                  )}
                </li>
              )
            )}
        </ul>
      </div>
    </Fragment>
  );
}
