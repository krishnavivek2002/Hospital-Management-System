const mongoose= require("mongoose")

const RegimenSchema  = new mongoose.Schema({
    RegimenID : { type: String, required: true },
    uuID : { type: String, required: true },
    practitionerID: { type: String, required: true },
    patientID : { type: String, required: true },
    patientName : { type: String, required: true },
    date : { type: Date, required: true },
    UpdateRegimenID : { type: String, required: true },
    
})

const Regimen = mongoose.model("Regimens", RegimenSchema)
module.exports = Regimen