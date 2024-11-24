import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Employee() {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true); 
    if (!employeeId) {
      setError('Please enter a valid Employee ID.');
      setEmployeeData(null);
      return;
    }

    try {
      setError('');
      const response = await axios.get('https://fake-json-api.mock.beeceptor.com/users');
      const employees = response.data;
      const employee = employees.find((emp) => emp.id === parseInt(employeeId, 10));

      if (employee) {
        setLoading(false); 
        setEmployeeData(employee);
      } else {
        setEmployeeData(null);
        setError('Employee not found.');
      }
    } catch (err) {
      setEmployeeData(null);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className='emp-cont'>
      <h2>Employee Search</h2>
      <div className="mb-3">
        <label htmlFor="employeeId" className="form-label">
          Enter Employee ID:
        </label>
        <input
          type="number"
          id="employeeId"
          className="form-control"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>

      {loading && (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {error && <p className="text-danger mt-3">{error}</p>}

      {employeeData && (
        <div className="table-container">
          <h4>Employee Details</h4>
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <td><strong>ID</strong></td>
                <td>{employeeData.id}</td>
              </tr>
              <tr>
                <td><strong>Name</strong></td>
                <td>{employeeData.name}</td>
              </tr>
              <tr>
                <td><strong>Company</strong></td>
                <td>{employeeData.company}</td>
              </tr>
              <tr>
                <td><strong>Username</strong></td>
                <td>{employeeData.username}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{employeeData.email}</td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>{employeeData.address}</td>
              </tr>
              <tr>
                <td><strong>ZIP</strong></td>
                <td>{employeeData.zip}</td>
              </tr>
              <tr>
                <td><strong>State</strong></td>
                <td>{employeeData.state}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>{employeeData.country}</td>
              </tr>
              <tr>
                <td><strong>Phone</strong></td>
                <td>{employeeData.phone}</td>
              </tr>
              <tr>
                <td><strong>Photo</strong></td>
                <td>
                  <img src={employeeData.photo} alt="Employee" className="employee-photo" style={{ width: '100px', height: '100px' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Employee;