import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const BASE = process.env.REACT_APP_API_URI;
  const userRef = useRef();
  const passRef = useRef();
  const login = (e) => {
    e.preventDefault();
    const payload = {
      username: userRef.current.value,
      password: passRef.current.value,
    };

    axios
      .post(`${BASE}/api/auth/login`, payload)
      .then((res) => {
        localStorage.setItem("session", res.data.token);
        navigate("/admin/dashboard", { replace: true });
        toast.success("Howdy, admin!");
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Internal server error!")
      );
  };
  return (
    <section className="">
      <div className="w-80 m-auto">
        <h2 className="font-semibold text-2xl text-center">Admin Login</h2>
        <form onSubmit={login}>
          <div class="form-group my-4">
            <label for="username__input">Email address</label>
            <input
              ref={userRef}
              type="text"
              class="form-control"
              id="username__input"
              placeholder="Enter username"
            />
          </div>
          <div class="form-group my-4">
            <label for="password__input">Password</label>
            <input
              ref={passRef}
              type="password"
              class="form-control"
              id="password__input"
              placeholder="Password"
            />
          </div>
          <button type="Submit" class="btn btn-dark container-fluid">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
