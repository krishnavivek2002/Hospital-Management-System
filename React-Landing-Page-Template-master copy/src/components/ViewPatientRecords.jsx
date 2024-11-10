import React, { useState } from "react";

const ViewPatientRecords = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [patientData, setPatientData] = useState([]);
    const [summary, setSummary] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetches individual patient records based on phone number
    const handleFetchRecords = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`http://localhost:5001/api/patient-descriptions/${phoneNumber}`);
            if (!response.ok) throw new Error("Patient not found");
            const data = await response.json();
            setPatientData(data.length === 0 ? [] : data);
            setErrorMessage(data.length === 0 ? "No records found for this patient." : '');
        } catch (error) {
            setErrorMessage('Error fetching patient records. Please check the phone number and try again.');
            setPatientData([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetches a summary of all previous descriptions
    const handleFetchSummary = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`http://localhost:5001/api/patient-descriptions/${phoneNumber}/summary`);
            if (!response.ok) throw new Error("Unable to fetch summary");
            const summaryData = await response.json();
            setSummary(summaryData.summary);  // Access 'summary' key in response
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error fetching summary.');
            setSummary('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="view-PatientRecords" style={styles.container}>
            <h2>View Patient Records</h2>
            <form onSubmit={handleFetchRecords}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Enter Patient Phone Number:</label>
                    <input 
                        type="tel" 
                        style={styles.input} 
                        value={phoneNumber} 
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setPatientData([]);
                            setSummary('');
                            setErrorMessage('');
                        }}
                        required 
                    />
                </div>
                <button type="submit" style={styles.button}>Fetch Records</button>
            </form>

            <button onClick={handleFetchSummary} style={styles.button}>Get Summary</button>

            {loading && <p>Loading...</p>}
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

            {summary && (
                <div style={styles.summarySection}>
                    <h3>Patient Records Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}

            {patientData.length > 0 && (
                <div style={styles.patientInfo}>
                    <h3>Patient Details:</h3>
                    {patientData.map((patient, index) => (
                        <div key={index} style={styles.patientRecord}>
                            <p><strong>Name:</strong> {patient.name}</p>
                            <p><strong>Date of Visit:</strong> {new Date(patient.dateOfVisit).toLocaleDateString()}</p>
                            <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                            <p><strong>Drug Given:</strong> {patient.drugGiven}</p>
                            <p><strong>Drug Change:</strong> {patient.drugChange}</p>
                            <p><strong>Description:</strong> {patient.description}</p>
                            <hr style={styles.separator} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    formGroup: {
        marginBottom: '15px',
        textAlign: 'center',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#555',
    },
    input: {
        width: '100%',
        maxWidth: '300px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        width: '100%',
        maxWidth: '300px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
    },
    errorMessage: {
        margin: '10px 0',
        color: '#d9534f',
        textAlign: 'center',
    },
    summarySection: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f1f1f1',
        borderRadius: '10px',
        maxWidth: '600px',
        textAlign: 'center',
    },
    patientInfo: {
        width: '100%',
        maxWidth: '600px',
        marginTop: '20px',
        textAlign: 'center',
    },
    patientRecord: {
        padding: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
    },
    separator: {
        margin: '10px 0',
        border: '0',
        borderTop: '1px solid #eee',
    },
};

export default ViewPatientRecords;
