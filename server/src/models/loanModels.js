const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loanType: {
    type: String,
    required: [true, 'Please specify loan type'],
    enum: ['Personal', 'Home', 'Vehicle', 'Education', 'Business']
  },
  amount: {
    type: Number,
    required: [true, 'Please specify loan amount']
  },
  purpose: {
    type: String,
    required: [true, 'Please specify loan purpose']
  },
  tenure: {
    type: Number,
    required: [true, 'Please specify loan tenure in months']
  },
  income: {
    type: Number,
    required: [true, 'Please specify your monthly income']
  },
  employmentType: {
    type: String,
    required: [true, 'Please specify your employment type'],
    enum: ['Salaried', 'Self-employed', 'Business Owner', 'Student', 'Retired', 'Unemployed']
  },
  employmentDuration: {
    type: Number,
    required: [true, 'Please specify your employment duration in months']
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'More Info Needed'],
    default: 'Draft'
  },
  statusReason: {
    type: String,
    default: null
  },
  interestRate: {
    type: Number,
    default: null
  },
  emi: {
    type: Number,
    default: null
  },
  applicationStage: {
    type: String,
    enum: ['Personal Info', 'Loan Details', 'Document Upload', 'Verification', 'Finished'],
    default: 'Personal Info'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before save
LoanSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Loan', LoanSchema);