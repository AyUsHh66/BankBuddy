const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  documentType: {
    type: String,
    required: [true, 'Please specify document type'],
    enum: ['Aadhaar', 'PAN', 'Income Proof', 'Address Proof', 'Bank Statement', 'Photo']
  },
  fileURL: {
    type: String,
    required: [true, 'Document file is required']
  },
  extractedData: {
    type: Object,
    default: {}
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending'
  },
  verificationMessage: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', DocumentSchema);