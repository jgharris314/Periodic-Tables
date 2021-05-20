import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, useParams } from "react-router-dom"

export default function SeatForm({tables}){

    const { reservation_id } = useParams();

    return (
        <div>
            Seat Form RESERVATION ID {reservation_id}
            <form>
                <select name="table_id"> 
                    {}
                </select>
            </form>
        </div>
    )
}