import { useState } from "react";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const initialState = {
    userName: "",    
    password: "", 
    role: "",  
  };

  const [formData, setFormData] = useState(initialState);
  let nevigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(formData) 
    }).then((response) => response.text)  // Convert response to JSON
    .then((data) => {
      nevigate("/");  // Navigate to the homepage
    })
    .catch((error) => {
      console.error("Error:", error);  // Handle any errors
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    setFormData(initialState);
  };

  return (
   <div> 
    <div>   
    <h2>Register</h2>   
      <div className="form-container">
        <form
          onSubmit={handleClick}
          className="register-form d-flex flex-column align-content-center"
        >
          <div className="form-group-row">
            <label htmlFor="validationTooltip01" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    userName: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="validationTooltip01"
                placeholder=""
                required
              />
            </div>
          </div>          
          <div className="form-group-row">
            <label htmlFor="inputPassword4" className="col-sm-2 col-form-label ">
              Password
            </label>
            <div className="col-sm-10">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder=""
                required
              />
            </div>
          </div>     
          <div className="form-group-row">
            <label htmlFor="inputEmail4" className="col-sm-2 col-form-label">
              Role
            </label>
            <div className="col-sm-10">
              <input
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                type="role"
                className="form-control"
                id="inputEmail4"
                placeholder=""
                required
              />
            </div>
          </div>     
          <button type="submit" className="btn btn-primary">
            Register
          </button>        
        </form>
      </div>
    </div>
    </div>
  );
}
