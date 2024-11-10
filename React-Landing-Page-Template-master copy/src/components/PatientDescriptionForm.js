import React, { useState } from "react";

const PatientDescriptionForm = () => {
    const [name, setName] = useState('');
    const [dateOfVisit, setDateOfVisit] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [drugGiven, setDrugGiven] = useState('');
    const [drugChange, setDrugChange] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            dateOfVisit,
            phoneNumber,
            drugGiven,
            drugChange,
            description,
        };

        try {
            const response = await fetch("http://localhost:5001/api/patient-descriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            const result = await response.json();
            setSuccessMessage(result.message || "Form submitted successfully!");
            setErrorMessage('');
            
            // Reset the form fields
            setName('');
            setDateOfVisit('');
            setPhoneNumber('');
            setDrugGiven('');
            setDrugChange('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Error submitting the form. Please try again later.');
            setSuccessMessage('');
        }
    };

    // Styles for the form
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f7f8',
            margin: 0,
            padding: 0,
        },
        formContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '20px',
            boxSizing: 'border-box',
        },
        patientForm: {
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
        },
        header: {
            marginBottom: '20px',
            textAlign: 'center',
            color: '#333',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            transition: 'border-color 0.3s',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            transition: 'border-color 0.3s',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            transition: 'border-color 0.3s',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        message: {
            margin: '10px 0',
            textAlign: 'center',
            color: '#d9534f',
        },
        successMessage: {
            color: '#5cb85c',
        },
    };

    return ( 
        <div id="patient-description-form" style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.patientForm}>
                <h2 style={styles.header}>Patient Description Form</h2>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input 
                        type="text" 
                        style={styles.input} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Date of Visit:</label>
                    <input 
                        type="date" 
                        style={styles.input} 
                        value={dateOfVisit} 
                        onChange={(e) => setDateOfVisit(e.target.value)} 
                        required 
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number:</label>
                    <input 
                        type="tel" 
                        style={styles.input} 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        required 
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Drug Given:</label>
                    <input 
                        type="text" 
                        style={styles.input} 
                        value={drugGiven} 
                        onChange={(e) => setDrugGiven(e.target.value)} 
                        required 
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Drug Change:</label>
                    <select 
                        style={styles.select} 
                        value={drugChange} 
                        onChange={(e) => setDrugChange(e.target.value)} 
                        required
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea 
                        style={styles.textarea} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Submit
                </button>

                {successMessage && <div style={{ ...styles.message, ...styles.successMessage }}>{successMessage}</div>}
                {errorMessage && <div style={styles.message}>{errorMessage}</div>}
            </form>
        </div>
    );
};

export default PatientDescriptionForm;
