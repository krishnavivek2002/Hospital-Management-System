const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;