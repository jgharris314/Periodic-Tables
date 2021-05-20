import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom"
import { createTable } from "../utils/api"
/**
 * Defines the NewTable page.
 * @param 
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

export default function NewTable() {
  const initialFormData = { table_name: "", capacity: 0 };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const errorsJSX = () => {
    return errors.map((error, index) => (
      <ErrorAlert key={index} error={error} />
    ));
  };

  const handleChange = ({ target }) => {
    const value =
      target.name === "capacity" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const validData = () => {
      const foundErrors = []
      const {table_name, capacity} = formData

      if(!table_name || table_name.length < 2){
          foundErrors.push({message: "Table must have a more descriptive name!"})
      }
      if(!capacity || capacity > 6 || capacity < 1){
          foundErrors.push({message: "Table must have a realistic capacity!"})
      }
      setErrors(foundErrors)
      return foundErrors.length === 0;
  };
  const handleSubmit = async (event) => {
      event.preventDefault();
      if(validData()){
          await createTable(formData).then((res) => history.push('/dashboard'))
      }
  };

  const handleCancel = (event) => {
      event.preventDefault();
      setFormData({...initialFormData})
      history.goBack()
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
          {errorsJSX()}
        <h3>Create a new Table</h3>
        <div className="container">
          <div className="row">
            <label htmlFor="table_name">
              Table Name
              <input
                id="table_name"
                type="text"
                name="table_name"
                onChange={handleChange}
                value={formData.table_name}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="capacity">
              Capacity
              <input
                id="capacity"
                type="number"
                name="capacity"
                onChange={handleChange}
                value={formData.capacity}
                required
              />
            </label>
          </div>
          <div className="row">
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}