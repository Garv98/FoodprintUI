const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username:   { type: String, required: true, unique: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  fullAddress:{ type: String },
  shoppingPreference: { type: String },
  registrationDate: { type: Date, default: Date.now },
  totalEmissions: { type: Number, default: 0 },
  emissionsSaved:{ type: Number, default: 0 },
  points:      { type: Number, default: 100 },
  profileImage:{ type: String }
});
module.exports = mongoose.model('User', userSchema);
