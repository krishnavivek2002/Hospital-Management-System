
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Medicine = require('./models/Medicine');
const MedicineDispatch = require('./models/MedicineDispatch');
const Regimen = require('./models/Regimen');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.aajzs.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new user
app.post('/api/users', async (req, res) => {
  const user = new User({
    userId: req.body.userId,
    name: req.body.name,
    role: req.body.role,
    dateOfJoining: req.body.dateOfJoining
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.userId = req.body.userId || user.userId;
      user.name = req.body.name || user.name;
      user.role = req.body.role || user.role;
      user.dateOfJoining = req.body.dateOfJoining || user.dateOfJoining;
      
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/patients", async(req, res) => {
  const { patientId, name, age, address, phoneNumber, gender, dateOfAdmission } = req.body
  const newPatient = await Patient.create(
    {
      patientId,
      name,
      phoneNo: phoneNumber,
      gender,
      age,
      doa: dateOfAdmission,
      address
    }
  )
  res.status(200).json("Patient record inserted successfully")
})

app.get("/api/patients", async(req, res) => {
  const patients = await Patient.find()
  return res.status(200).json(patients)
})

app.get("/api/medicineDispatch" , async(req, res) => {
  const medicineDispatches = await MedicineDispatch.find()
  return res.status(200).json(medicineDispatches)
})

app.post("/api/medicineDispatch" , async(req, res) => {
  const { eventId, patientName, date, medicineId, quantity,practitionerId } = req.body
  const medicineDispatch = await MedicineDispatch.create({
    eventID: eventId,
    patientName,
    date,
    medicineID: medicineId,
    quantity,
    practitionerID: practitionerId
  })
  return res.status(200).json(medicineDispatch)
})

app.get("/api/medicines" , async(req, res) => {
  const medicines = await Medicine.find()
  return res.status(200).json(medicines)
})

app.post("/api/medicines" , async(req, res) => {
  const { medicineID, medicineName, cost, quantity,shelfSection } = req.body
  const Medicines = await Medicine.create({
    medicineID: medicineID,
    medicineName,
    cost: parseInt(cost),
    quantity: parseInt(quantity),
    shelfSection
    })
  return res.status(200).json(Medicines)
})

app.get("/api/regimens" , async(req, res) => {
  const regimens = await Regimen.find()
  return res.status(200).json(regimens)
})

app.post("/api/regimens" , async(req, res) => {
  const { regimenId,uuid, practitionerId, patientId, patientName,dateOfAppointment, updatedRegimen} = req.body
  const regimens = await Regimen.create({
    RegimenID: regimenId,
    uuID: uuid,
    practitionerID: practitionerId,
    patientID: patientId,
    patientName,
    date: dateOfAppointment,
    UpdateRegimenID: updatedRegimen,
    })
  return res.status(200).json(regimens)
})



const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));