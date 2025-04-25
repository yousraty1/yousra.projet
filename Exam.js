const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  titre: String,
  description: String,
  publicCible: String,
  lienUnique: String,
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);