import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
  let navigate = useNavigate();

  const adminpassword = "Admin1234";

  function loginAsAdmin() {
    const pw = document.getElementById("adminpw");

    if (pw.value === adminpassword) {
      navigate("/admin");
    } else {
      alert("Password Incorrent");
    }
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-3 fw-bold fs-5">
                  Enter the Admin password to Sign In
                </h5>
                <hr className="border border-info border-1 my-2" />
                <div className="form-floating mb-3">
                  <input
                    id="adminpw"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    onClick={() => loginAsAdmin()}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSignIn;
