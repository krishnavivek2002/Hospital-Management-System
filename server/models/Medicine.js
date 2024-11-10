const mongoose= require("mongoose")

const MedicineSchema  = new mongoose.Schema({
    medicineID : { type: String, required: true },
    medicineName : { type: String, required: true },
    cost : { type: Number, required: true },
    quantity: { type: Number, required: true },
    shelfSection: { type: String, required: true },
})

const Medicine = mongoose.model("Medicine", MedicineSchema)
module.exports = Medicine