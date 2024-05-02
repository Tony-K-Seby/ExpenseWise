import React, { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const loginref = useRef();
  const loginpassref = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = loginref.current.value;
    const pass = loginpassref.current.value;
    localStorage.setItem("email", email);
    const res = await axios.get(`http://localhost:8080/user/${email}`);
    localStorage.setItem("id", res.data.id);
    localStorage.setItem("username", res.data.username);
    if (res.status === 200) {
      if (res.data.password == pass) {
        navigate("/dashboard");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ username: "", email: "", password: "" });
    await axios
      .post("http://localhost:8080/user", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="User name"
            value={formData.username}
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            value={formData.email}
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={formData.password}
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            ref={loginref}
            name="email"
            placeholder="Email"
            required=""
          />
          <input
            ref={loginpassref}
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
