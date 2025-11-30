import React from "react";
// import login from "../assets/login.png";
import login from "../assets/login1.svg";
import "./auth.css";

const Login = ({ onSwitch }) => {
  return (
    <div className="login-container d-flex align-items-center justify-content-center bg-light">
      <div className="row rounded-4 overflow-hidden login-box w-100 m-0">
        {/* ===== Left Blue Panel ===== */}
        <div className="col-md-5 d-flex flex-column justify-content-center align-items-center text-white p-5 login-left">
          <h3 className="fw-bold mb-3">Welcome Back.</h3>
          <p className="mb-4">Please enter your credentials.</p>
          <div className="bg-left">
            <img
              src={login}
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
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={onSwitch} // ✅ switches tab in AuthLayout
                className="btn btn-link text-primary fw-semibold p-0"
              >
                Sign Up
              </button>
            </small>
          </div>

          <form>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <div className="input-group">
                <input
                  type="email"
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
                  className="form-control"
                  placeholder="Enter Password"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-lock"></i>
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
              SIGN IN
            </button>

            <p className="text-muted mt-3 small">
              By clicking Sign In you agree to our terms and conditions,
              privacy policy and reusability rules.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
