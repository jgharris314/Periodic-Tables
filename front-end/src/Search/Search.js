import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {listReservations} from "../utils/api"
import DashboardItem from "../DashboardItem/DashboardItem"
import ErrorAlert from "../layout/ErrorAlert"
import './search.css'

/**
 * Defines the Search page.
 * @param
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

export default function Search() {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState(null);
  const [noResult, setNoResult] = useState(false)

  const handleSubmit =  (event) => {
    event.preventDefault();

    setErrors(null);
    listReservations({ mobile_number: formData.mobile_number })
      .then((results) => {
        setResults(results);
        isSearchResultsEmpty(results);
      })
      .catch(setErrors);
  };

  const isSearchResultsEmpty = (results) => {
    setNoResult(false);
    if (results.length === 0) {
      setNoResult(true);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData({});
    history.goBack();
  };

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };
  return (
    <div className="container">
      <div className="card newSearchCard">
        <div className="card-body newSearchCardBody">
        <h3>Search</h3>
      
      
        <form onSubmit={handleSubmit}>
          <ul className="list-group-flush newSearchList">
            <li className="list-group-item">
          <label htmlFor="mobile_number">
            Mobile Number:{" "}
            <input className="list-group-item"
              id="mobile_number"
              type="text"
              name="mobile_number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            />
          </label>
          </li>
          </ul>
          <div className="searchButtons">
            <button type="submit" className="btn btn-primary">Find</button>
            <button onClick={handleCancel} className="btn btn-danger">Cancel</button>
          </div>
        </form>
        {errors ? <ErrorAlert error={errors} />: null }
        <DashboardItem reservations={results}/>
        {noResult ? <h6>No reservations found</h6> : null}
      </div>
      </div>
    </div>
  );
}
