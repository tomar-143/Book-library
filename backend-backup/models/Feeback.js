const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email_id: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
  },
  feedbackcontent: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('feedback', bookSchema);