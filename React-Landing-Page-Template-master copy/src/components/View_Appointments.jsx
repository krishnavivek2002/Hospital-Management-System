import React, { useState } from "react";

const initialAppointments = [
  { token: 1, customer: "Rahul Sharma", date: "2024-10-25", time: "10:00 AM", location: "Delhi", status: "Completed", type: "Offline" },
  { token: 2, customer: "Priya Verma", date: "2024-10-26", time: "02:00 PM", location: "Mumbai", status: "Cancelled", type: "Online" },
  { token: 3, customer: "Anita Desai", date: "2024-10-27", time: "09:30 AM", location: "Bengaluru", status: "Upcoming", type: "Offline" },
  { token: 4, customer: "Vikram Singh", date: "2024-10-28", time: "01:00 PM", location: "Chennai", status: "Upcoming", type: "Online" },
  { token: 5, customer: "Sunita Rao", date: "2024-10-29", time: "11:00 AM", location: "Hyderabad", status: "Completed", type: "Offline" },
  { token: 6, customer: "Ravi Patel", date: "2024-10-30", time: "03:15 PM", location: "Ahmedabad", status: "Upcoming", type: "Offline" },
  { token: 7, customer: "Nisha Gupta", date: "2024-10-31", time: "12:00 PM", location: "Kolkata", status: "Upcoming", type: "Online" },
  { token: 8, customer: "Amit Mehta", date: "2024-10-25", time: "10:45 AM", location: "Pune", status: "Completed", type: "Offline" },
  { token: 9, customer: "Samir Khan", date: "2024-11-01", time: "09:00 AM", location: "Delhi", status: "Upcoming", type: "Online" },
  { token: 10, customer: "Leena Mehta", date: "2024-11-02", time: "11:30 AM", location: "Mumbai", status: "Upcoming", type: "Offline" },
  { token: 11, customer: "Anil Joshi", date: "2024-11-03", time: "02:00 PM", location: "Bengaluru", status: "Upcoming", type: "Online" },
];

const ViewAppointments = () => {
  const [appointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const filteredAppointments = appointments
    .filter(appointment =>
      appointment.status === "Upcoming" && 
      appointment.customer.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleSortToggle = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return { color: "green" };
      case "Cancelled":
        return { color: "red" };
      case "Upcoming":
        return { color: "orange" };
      default:
        return {};
    }
  };

  return (
    <div id="view-appointments" style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>View Upcoming Appointments</h1>
        <input
          type="search"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </header>
      <main style={styles.main}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Token Number</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>
                Date 
                <span 
                  onClick={handleSortToggle} 
                  style={styles.sortIcon}
                >
                  {sortOrder === "asc" ? " 🔼" : " 🔽"}
                </span>
              </th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Appointment Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment.token} style={getRowStyle(index)}>
                  <td style={styles.td}>{appointment.token}</td>
                  <td style={styles.td}>{appointment.customer}</td>
                  <td style={styles.td}>{formatDate(appointment.date)}</td>
                  <td style={styles.td}>{appointment.time}</td>
                  <td style={styles.td}>{appointment.location}</td>
                  <td style={{ ...styles.td, ...getStatusStyle(appointment.status) }}>{appointment.status}</td>
                  <td style={styles.td}>{appointment.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.td}>No upcoming appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    paddingTop: "80px",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    padding: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    margin: "0",
  },
  searchInput: {
    padding: "10px",
    width: "80%",
    maxWidth: "400px",
    margin: "20px auto 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    color: "#333",
    backgroundColor: "white",
  },
  main: {
    flex: "1",
    padding: "20px",
    overflowY: "auto",
    margin: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  sortIcon: {
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default ViewAppointments;
