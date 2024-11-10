import React from "react";

export const Navigation = () => {
  const handleLogout = () => {
    // Clear authentication token or any user data from local storage if necessary
    localStorage.removeItem("authToken"); // Example for clearing token
    // Redirect to the logout URL
    window.location.href = "https://sensational-mochi-66ba4d.netlify.app/";
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="#page-top"></a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">Upload</a>
            </li>
            <li>
              <a href="#about" className="page-scroll">Profile</a>
            </li>
            <li>
              <a href="#view-appointments" className="page-scroll">Appointments</a>
            </li>
            <li>
              <a href="#view-PatientRecords" className="page-scroll">Records</a>
            </li>
            <li>
              <a href="#patient_tracking" className="page-scroll">Patient Tracking</a>
            </li>
            <li>
              <a href="#patient-description-form" className="page-scroll">Patient Description</a>
            </li>
            <li>
              <a onClick={handleLogout} className="page-scroll" style={{ cursor: "pointer" }}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
