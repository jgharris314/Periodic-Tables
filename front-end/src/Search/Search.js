import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {listReservations} from "../utils/api"
import DashboardItem from "../DashboardItem/DashboardItem"
import ErrorAlert from "../layout/ErrorAlert"
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
      <div className="row">
        <h2>Search</h2>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <label htmlFor="mobile_number">
            Mobile Number:{" "}
            <input
              id="mobile_number"
              type="text"
              name="mobile_number"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            />
          </label>
          <div className="row">
            <button type="submit">Find</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        {errors ? <ErrorAlert error={errors} />: null }
        <DashboardItem reservations={results}/>
        {noResult ? <h6>No reservations found</h6> : null}
      </div>
    </div>
  );
}
