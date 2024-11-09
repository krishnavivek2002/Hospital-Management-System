const mongoose= require("mongoose")

const PatientSchema = new mongoose.Schema({
    patientId : { type: String, required: true },
    name : { type: String, required: true },
    phoneNo : { type: String, required: true },
    gender : { type: String, required: true },
    age: { type: Number, required: true },
    doa: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true }
})

const Patient = mongoose.model("Patient", PatientSchema)
module.exports = Patient