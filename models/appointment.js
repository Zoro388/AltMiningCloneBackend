// models/appointment.js
const mongoose = require("mongoose");

const sicknessRecordSchema = new mongoose.Schema({
  sicknessName: { type: String, required: true },
  visitDate: { type: Date, required: true },
  drugsPrescribed: [
    {
      drugName: { type: String, required: true },
      dosage: { type: String, required: true },
    },
  ],
});

const appointmentSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  sicknessRecords: [sicknessRecordSchema],
});

module.exports = mongoose.model("Appointment", appointmentSchema);
