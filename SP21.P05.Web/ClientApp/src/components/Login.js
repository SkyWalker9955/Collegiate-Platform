import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./stylesheets/Login.css";
import axios from "axios";

function Separator() {
  return <div className="separator" />;
}
function Login() {
  var [userName, setUserName] = useState(null);
  var [password, setPassword] = useState(null);
  const history = useHistory();

  const onLoginPressed = (e) => {
    e.preventDefault();

    var submission = {
      userName: userName,
      password: password,
    };
    console.log(submission);
    axios
      .post("/api/authentication/login/", submission, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          alert("Logged in Successfully");
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUserChange = (e) => {
    var value = e.target.value;
    if (value != null) {
      setUserName(value);
    }
  };
  const handlePassChange = (e) => {
    var value = e.target.value;
    if (value != null) {
      setPassword(value);
    }
  };
  return (
    <div className="container">
      <div>
        <h2 className="title">Collegiate Events</h2>

        <Separator />

        <form onSubmit={onLoginPressed.bind(this)}>
          <label className="input">
            <input placeholder="Username" type="text" onChange={handleUserChange} />
          </label>
          <Separator />
          <label className="input">
            <input placeholder="Password" type="password" onChange={handlePassChange} />
          </label>
          <Separator />
          <input className="buttonPosition" type="submit" value="Login" />
        </form>

        <div>
          <Separator />
        </div>
      </div>
    </div>
  );
}

export default Login;
