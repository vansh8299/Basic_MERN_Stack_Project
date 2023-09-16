import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2 style={{ color: "purple" }}>Login to continue to noteslocker</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="email" className="form-label">
            <h4 style={{ color: "black" }}>Email Address</h4>
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="form-label">
            <h4 style={{ color: "black" }}>Password</h4>
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
