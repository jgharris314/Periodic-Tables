# Periodic Tables: Restaurant Reservation System

A simple app to help restaurants manage their reservations.

## Key Features
- View all reservations for the current day
- Create and edit reservations
- Assign a reservation to a table
- Clear a table when the reservation leaves
- Search for reservations by mobile number
- Cancel a reservation

## Technologies

Frontend: HTML5, CSS3, Javascript, Bootstrap, React.js
Backend: Node.js, Express.js, PostgreSQL

## Screenshots
<img src="https://github.com/jgharris314/Periodic-Tables" />

## API

| Endpoint                               | Method | Description                                                                                           |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `/reservations`                        | GET    | Gets all of the reservations. |
| `/reservations`                        | POST   | Creates a new reservation.                                                                            |
| `/reservations/:reservation_id`        | GET    | Gets the reservation corresponding to 'reservation_id'.                                               |
| `/reservations/:reservation_id`        | PUT    | Updates the reservation corresponding to 'reservation_id'.                                            |
| `/reservations/:reservation_id/status` | PUT    | Updates the reservation status.                                                                       |
| `/tables`                              | GET    | Gets all of the tables.                                                                               |
| `/tables`                              | POST   | Creates a table.                                                                                      |
| `/tables/:tableId/seat`                | PUT    | Assigns a reservation to a table.                                                                     |
| `/tables/:tableId/seat`                | DELETE | Frees a table for future reservations.                                                                |