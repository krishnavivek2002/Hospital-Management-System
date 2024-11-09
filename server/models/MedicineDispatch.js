const mongoose= require("mongoose")

const MeditionDispatchSchema  = new mongoose.Schema({
    eventID : { type: String, required: true },
    patientName : { type: String, required: true },
    date : { type: Date, required: true },
    medicineID : { type: String, required: true },
    quantity: { type: Number, required: true },
    practitionerID: { type: String, required: true },
})

const MedicineDispatch = mongoose.model("Medicine Dispatch", MeditionDispatchSchema)
module.exports = MedicineDispatch