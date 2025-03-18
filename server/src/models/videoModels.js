const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true,
    enum: ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati']
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  stage: {
    type: String,
    required: true
  },
  questions: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Video', VideoSchema);