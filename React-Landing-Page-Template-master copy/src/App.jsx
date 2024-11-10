import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import Patient_Tracking from "./components/Patient_Tracking"; // Existing import
import ViewAppointments from "./components/View_Appointments";
import PatientDescriptionForm from "./components/PatientDescriptionForm"; // Import the new component
import ViewPatientRecords from "./components/ViewPatientRecords"; // Import the ViewPatientRecords component
import Chatbot from "./components/chatbot"; // Import the Chatbot component

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

// Initialize SmoothScroll for smooth navigation
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  // Fetch landing page data from JSON on component mount
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} id="header" />
      <Features data={landingPageData.Features} id="features" />
      <About data={landingPageData.About} id="about" />
      <ViewAppointments id="view-appointments" />
      <div id="view-patient-records" style={styles.formContainer}>
        <h2>View Patient Records</h2>
        <ViewPatientRecords />
      </div>

      <Patient_Tracking data={landingPageData.Patient_Tracking} id="patient-tracking" /> {/* Existing component usage */}
      <div id="patient-description-form" style={styles.formContainer}>
        <h2>Patient Description</h2>
        <PatientDescriptionForm />
      </div>

      {/* Add the Chatbot component here */}
      <div id="chatbot-container" style={styles.chatbotContainer}>
        <Chatbot /> {/* Chatbot integrated into the page */}
      </div>
    </div>
  );
};

// Styles for the Patient Description Form, View Patient Records section, and Chatbot container
const styles = {
  formContainer: {
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9", // Added background color for better contrast
  },
  chatbotContainer: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};

export default App;
