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
<img src="https://github.com/jgharris314/Periodic-Tables/blob/main/readme-screenshots/us-01-submit-after.png" alt="dashboardImage" title="dashboardImage" width="600"/>&nbsp;
<img src="https://github.com/jgharris314/Periodic-Tables/blob/main/readme-screenshots/us-01-submit-before.png" alt="newReservation" title="newReservationImage" width="600"/>&nbsp;

<img src="https://github.com/jgharris314/Periodic-Tables/blob/main/readme-screenshots/us-07-search-reservations-submit-valid-after.png" alt="searchImage" title="searchImage" width="600"/>&nbsp;

## Installation
1. Fork and clone this repository
2. Run `npm i`
3. Create a `.env` file in the `backend` directory.
4. Modify `.env` with the following:</br>
   <code>
   &nbsp;DATABASE*URL=\_productionURL*</br>
   &nbsp;DATABASE*URL_DEVELOPMENT=\_developmentURL*</br>
   &nbsp;DATABASE*URL_TEST=\_testURL*</br>
   &nbsp;DATABASE*URL_PREVIEW=\_previewURL*</br>
   &nbsp;LOG_LEVEL=info</br>
   </code> 
5. Update each url to the appropriate database URL
6. Create a `.env` file in the `frontend` directory.
7. Modify `.env` with the following:</br>
   <code>REACT_APP_API_BASE_URL=http://localhost:5000<br/></code>
8. From inside the backend directory, run `npx knex migrate:latest`.
9. Run `npx knex seed:run`.
10. Go back to the main directory and run `npm run start:dev` to run the application locally.

 
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