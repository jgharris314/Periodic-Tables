import React, { useState } from "react";
import { updateReservationStatus } from "../utils/api";
import './dashboardItem.css'
export default function DashboardItem({
  date,
  reservations,
  refreshReservations,
}) {
  const [error, setError] = useState([]);
  const handleCancel = async (reservation_id) => {
    const confirmed = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmed) {
      try {
        await updateReservationStatus(reservation_id, "cancelled");
        await refreshReservations();
      } catch (error) {
        setError(error);
      }
    }
  };

  if (date) {
    return (
      <div className="container ">
        <div className="row">
          {reservations

            .filter(
              (e) =>
                e.reservation_date === date &&
                e.status !== "finished" &&
                e.status !== "cancelled"
            )
            .map(
              ({
                first_name,
                last_name,
                people,
                reservation_time,
                status,
                reservation_id,
              }) => (
                <div className="col col-4" key={reservation_id}>
                  <div className="card dashboardItem">
                  <div className="card-body">
                  <p>FirstName: {first_name}</p>
                  <p>Last Name: {last_name}</p>
                  <p>Seats: {people}</p>
                  <p>Time: {reservation_time}</p>
                  <p data-reservation-id-status={reservation_id}>
                    {" "}
                    Status: {status}{" "}
                  </p>
                  {status === "booked" ? (
                    <div>
                      <a href={`/reservations/${reservation_id}/seat`} className="btn btn-primary">
                        Seat
                      </a>
                      <a href={`/reservations/${reservation_id}/edit`} className="btn btn-secondary">
                        Edit
                      </a>
                      <button
                        onClick={() => handleCancel(reservation_id)}
                        data-reservation-id-cancel={reservation_id}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCancel(reservation_id)}
                      data-reservation-id-cancel={reservation_id}
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>
                  )}
                  </div>
                </div>
                </div>
              )
              
            )}
            
        </div>
        
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          {reservations

            .filter((e) => e.status !== "finished" && e.status !== "cancelled")
            .map(
              ({
                first_name,
                last_name,
                people,
                reservation_time,
                status,
                reservation_id,
                reservation_date
              }) => (
                <div className="col col-4" key={reservation_id}>
                  <div className="card dashboardItem">
                  <div className="card-body">
                  <p>FirstName: {first_name}</p>
                  <p>Last Name: {last_name}</p>
                  <p>Seats: {people}</p>
                  <p>Time: {reservation_time}</p>
                  <p>Reservation Date: {reservation_date}</p>
                  <p data-reservation-id-status={reservation_id}>
                    {" "}
                    Status: {status}{" "}
                  </p>
                  {status === "booked" ? (
                    <div>
                      <a href={`/reservations/${reservation_id}/seat`} className="btn btn-primary">
                        Seat
                      </a>
                      <a href={`/reservations/${reservation_id}/edit`} className="btn btn-secondary">
                        Edit
                      </a>
                      <button
                        onClick={() => handleCancel(reservation_id)}
                        data-reservation-id-cancel={reservation_id}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCancel(reservation_id)}
                      data-reservation-id-cancel={reservation_id}
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>
                  )}
                  </div>
                </div>
                </div>
              )
              
            )}
            
        </div>
        
      </div>
    );
  }
}
