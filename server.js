import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';  // Import JWT for authentication
import dotenv from 'dotenv';


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')); // Serve static files from the uploads directory

// Your routes and other app logic can go here

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Export the app for testing
export default app; // Default export

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://krishnavivekyarrakula2002:MHmbKeMG5Rgu5RC@doctormodule.8ztyt.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Configure multer for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG and PNG files are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


// Doctor Schema
const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true },
  doctorRegistrationNumber: { type: String, required: true, unique: true },
  profileImage: { type: String } // Store the image path or URL
});

// Hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

// Doctor registration route
app.post("/api/doctors", upload.single("profileImage"), async (req, res) => {
  const {
    firstName, lastName, birthday, gender, state, city, pincode, specialization,
    email, contactNumber, password, doctorRegistrationNumber
  } = req.body;

  if (!firstName || !lastName || !birthday || !gender || !state || !city || !pincode || 
      !specialization || !email || !contactNumber || !password || !doctorRegistrationNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newDoctor = new Doctor({
    firstName, lastName, birthday, gender, state, city, pincode, specialization,
    email, contactNumber, password, doctorRegistrationNumber,
    profileImage: req.file ? req.file.path : null // Save the file path
  });

  try {
    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (error) {
    console.error("Error registering doctor:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or registration number already exists" });
    }
    res.status(400).json({ error: "Error registering doctor", details: error.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Example protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Feedback submission route
app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newFeedback = new Feedback({ name, email, message });

  try {
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Error submitting feedback" });
  }
});

// Patient Schema

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfVisit: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  drugGiven: { type: String, required: true },
  drugChange: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: true },  // Add 'keywords' field
});

const PatientDescription = mongoose.model("PatientDescription", patientSchema);




// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ }, // Validating a 10-digit number
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Confirmed', 'Cancelled'] },
  mode: { type: String, required: true, enum: ['In-Person', 'Online'] },
  tokenNumber: { type: Number, unique: true }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Route to book an appointment
app.post("/api/book-appointments", async (req, res) => {
  const { customerName, mobileNumber, appointmentDate, appointmentTime, location, status, mode } = req.body;

  // Validation: Ensure all fields are provided
  if (!customerName || !mobileNumber || !appointmentDate || !appointmentTime || !location || !status || !mode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate mobile number format (should be 10 digits)
  if (!/^[0-9]{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: "Invalid mobile number. It should be a 10-digit number." });
  }

  // Generate a random token number
  const tokenNumber = Math.floor(100000 + Math.random() * 900000);

  const newAppointment = new Appointment({
    customerName,
    mobileNumber,
    appointmentDate,
    appointmentTime,
    location,
    status,
    mode,
    tokenNumber
  });

  try {
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", tokenNumber });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Error booking appointment" });
  }
});

// Route to fetch all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }
    res.json(appointments); // Return the appointments as JSON
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to update an appointment
app.put("/api/appointments/:tokenNumber", async (req, res) => {
  const { tokenNumber } = req.params;
  const { customerName, mobileNumber, appointmentDate, appointmentTime, location, status, mode } = req.body;

  // Validation: Ensure all fields are provided
  if (!customerName || !mobileNumber || !appointmentDate || !appointmentTime || !location || !status || !mode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate mobile number format (should be 10 digits)
  if (!/^[0-9]{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: "Invalid mobile number. It should be a 10-digit number." });
  }

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { tokenNumber },
      { customerName, mobileNumber, appointmentDate, appointmentTime, location, status, mode },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment updated successfully", updatedAppointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete an appointment
app.delete("/api/appointments/:tokenNumber", async (req, res) => {
  const { tokenNumber } = req.params;

  try {
    const deletedAppointment = await Appointment.findOneAndDelete({ tokenNumber });

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.post("/api/patient-descriptions", async (req, res) => {
  const { name, dateOfVisit, phoneNumber, drugGiven, drugChange, description, keywords } = req.body;

  // Check if all fields are provided
  if (!name || !dateOfVisit || !phoneNumber || !drugGiven || !drugChange || !description || !keywords) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Create a new PatientDescription instance with all fields including keywords
  const newPatientDescription = new PatientDescription({
    name, 
    dateOfVisit, 
    phoneNumber, 
    drugGiven, 
    drugChange, 
    description,
    keywords,  // Save the keywords to the database
  });

  try {
    // Save the new patient description
    await newPatientDescription.save();
    res.status(201).json({ message: "Patient description submitted successfully!" });
  } catch (error) {
    console.error("Error submitting patient description:", error);
    res.status(500).json({ error: "Error submitting patient description" });
  }
});




// Fetch patient records by phone number
app.get("/api/patient-descriptions/:phoneNumber", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
      console.log("Fetching records for phone number:", phoneNumber);

      const patients = await PatientDescription.find({ phoneNumber });
      if (patients.length === 0) {
          console.log("No records found for this patient");
          return res.status(404).json({ message: "No records found for this patient." });
      }

      console.log("Records fetched successfully:", patients);
      res.json(patients);
  } catch (error) {
      console.error("Error fetching patient records:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch summary of all patient descriptions by phone number
app.get("/api/patient-descriptions/:phoneNumber/summary", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  try {
      console.log(`Fetching summary for phone number: ${phoneNumber}`);
      
      const patientDescriptions = await PatientDescription.find({ phoneNumber });

      if (patientDescriptions.length === 0) {
          return res.status(404).json({ message: "No records found for this patient." });
      }

      // Generate a summary (example: concatenating descriptions)
      const summary = patientDescriptions.map(desc => desc.description).join(' ');

      console.log("Summary generated successfully:", summary);
      res.json({ summary });
  } catch (error) {
      console.error("Error fetching summary:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});


// Server setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});