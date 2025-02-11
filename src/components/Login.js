import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as React from 'react';

export default function Login(props) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        // Ensure the response is properly parsed to JSON
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the response body as JSON
      })
      .then((data) => {
        // Assuming the JWT token is in data.token
        const token = data.token;
        if (token) {
          // Store the token in local storage
          localStorage.setItem('jwtToken', token);
          navigate("/Student"); // Navigate to the Student page
        } else {
          console.error("Token is missing in response");
        }
      })
      .catch((error) => {
        console.error("Error:", error);  // Handle any errors
      });


  }

  return (
    <div className="login_form_container">
      <div className="card">
        <b className="card-header text-center">Login</b>
        <form className="card-body"> <br />
          <div className="form-group">
            <label htmlFor="inputEmail">User Name</label><br />
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userName: e.target.value,
                })
              }
              type="email"
              className="form-control"
              id="inputUser"
              placeholder="User name"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="inputPassword">Password</label><br />
            <input
              value={formData.userName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userName: e.target.value,
                })
              }
              type="email"
              className="form-control"
              id="inputUser"
              placeholder="User name"
              required
            />
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
              id="inputPassword"
              placeholder="Password"
              required
            />

          </div><br />
          <div className="login_button_box">
            <button className="submit_button" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <button
              className="register_button"
              onClick={() => navigate("/register")}
            >
              {" "}
              Register{" "}
            </button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}