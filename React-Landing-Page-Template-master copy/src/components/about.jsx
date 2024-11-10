import React, { useState } from "react";

export const About = (props) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    specialization: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.contactNumber) errors.contactNumber = "Contact number is required.";
    if (!formData.specialization) errors.specialization = "Specialization is required.";
    if (!formData.password) errors.password = "Password is required.";

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = "Email format is invalid.";
    }

    // Contact number validation (optional)
    if (formData.contactNumber && !/^\d+$/.test(formData.contactNumber)) {
      errors.contactNumber = "Contact number must be numeric.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch(`http://your-api-url/updateDoctor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionMessage('Account settings updated successfully!');
        setFormErrors({});
        setFormData(initialFormData); // Reset the form
      } else {
        const errorData = await response.json();
        setSubmissionMessage(`Error: ${errorData.message || 'An error occurred'}`);
      }
    } catch (error) {
      setSubmissionMessage(`Error: ${error.message}`);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setSubmissionMessage('');
  };

  return (
    <div id="about" style={styles.about}>
      <div className="container" style={styles.container}>
        <div className="row" style={styles.row}>
          <div className="col-xs-12 col-md-6" style={styles.imageContainer}>
            <img src="img/about.jpg" className="img-responsive" alt="" style={styles.image} />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text" style={styles.aboutText}>
              <h2>Account Settings</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="First Name"
                    required
                  />
                  {formErrors.firstName && <span style={styles.error}>{formErrors.firstName}</span>}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Last Name"
                    required
                  />
                  {formErrors.lastName && <span style={styles.error}>{formErrors.lastName}</span>}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Email"
                    required
                  />
                  {formErrors.email && <span style={styles.error}>{formErrors.email}</span>}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Contact Number"
                    required
                  />
                  {formErrors.contactNumber && <span style={styles.error}>{formErrors.contactNumber}</span>}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Specialization"
                    required
                  />
                  {formErrors.specialization && <span style={styles.error}>{formErrors.specialization}</span>}
                </div>

                <div className="form-group" style={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Password"
                    required
                  />
                  {formErrors.password && <span style={styles.error}>{formErrors.password}</span>}
                </div>

                <div className="text-center">
                  <button type="submit" style={styles.button}>Update</button>
                  <button type="button" onClick={handleReset} style={styles.resetButton}>Reset</button>
                </div>

                {/* Submission message */}
                {submissionMessage && <div style={styles.message}>{submissionMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  about: {
    padding: '0',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1200px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  aboutText: {
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#28a745',
  },
};
