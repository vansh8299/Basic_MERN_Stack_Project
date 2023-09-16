import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2 style={{ color: "purple" }}>Create an account to use noteslocker</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="name" className="form-label">
            <h4 style={{ color: "black" }}>Name</h4>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="my-4">
          <label htmlFor="email" className="form-label">
            <h4 style={{ color: "black" }}>Email Address</h4>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <h4 style={{ color: "black" }}>Password</h4>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            <h4 style={{ color: "black" }}>Confirm Password</h4>
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
