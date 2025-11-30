import React, { useState } from "react";
import signup from "../assets/register.svg";
import "./auth.css";
import api from "../api/axios";

const Register = ({ onSwitch }) => {
    const [formData, setFormData] = useState({
        userName : "",
        email: "",
        password : ""
    })
     
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("second")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        setMessage("");

        try {
            const res = await api.post("/auth/register", formData)

            if(res.status.data){
                setMessage("Registered Successfully")
                console.log("RESPONSE : " , res.data.data)
                setTimeout(() => onSwitch(), 1500)
            }
        } catch (error) {
            console.log("Error : ", error);
            setMessage("Registration Failed Try Again")
        }
    }
  return (
    <div className="login-container d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow rounded-4 overflow-hidden login-box w-100 m-0">
        {/* ===== Left Blue Panel ===== */}
        <div className="col-md-5 d-flex flex-column justify-content-center align-items-center text-white p-5 login-left">
          <h3 className="fw-bold mb-3">Sign Up Now.</h3>
          <p className="mb-4">Join the crowd and get started.</p>
          <div className="bg-left">
            <img
              src={signup}
              alt="illustration"
              className="img-fluid"
              style={{ maxHeight: "312px" }}
            />
          </div>
        </div>

        {/* ===== Right Form Section ===== */}
        <div className="col-md-7 bg-white p-5">
          <div className="text-end mb-4">
            <small>
              Already have an account?{" "}
              <button
                onClick={onSwitch} // ✅ switches tab in AuthLayout
                className="btn btn-link text-primary fw-semibold p-0"
              >
                Sign In
              </button>
            </small>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Username</label>
              <div className="input-group">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange = {handleChange}
                  className="form-control"
                  placeholder="Enter Username"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-person"></i>
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Email</label>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange = {handleChange}
                  className="form-control"
                  placeholder="Enter Your Email"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-envelope"></i>
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange = {handleChange}
                  className="form-control"
                  placeholder="Enter Password"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-lock"></i>
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
              SIGN UP
            </button>

            <p className="text-muted mt-3 small">
              By clicking Sign Up you agree to our terms and conditions,
              privacy policy and reusability rules.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
