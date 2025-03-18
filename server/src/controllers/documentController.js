const Document = require('../models/documentModel');
const Loan = require('../models/loanModel');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB max file size
  },
  fileFilter: fileFilter
});

// @desc    Upload document
// @route   POST /api/documents
// @access  Private
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const { loanId, documentType } = req.body;

    // Check if loan exists and belongs to the user
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to upload documents for this loan'
      });
    }

    // Process the uploaded document
    const fileURL = `/uploads/${req.file.filename}`;
    
    // In a real application, we would process the document with OCR here
    // For demonstration, we'll simulate extracted data
    const extractedData = simulateDataExtraction(documentType);

    // Create document record
    const document = await Document.create({
      user: req.user.id,
      loan: loanId,
      documentType,
      fileURL,
      extractedData,
      verificationStatus: 'Verified' // Auto-verify for demo
    });

    // Update loan with document reference
    loan.documents.push(document._id);
    
    // Update application stage if this is the first document
    if (loan.applicationStage === 'Loan Details') {
      loan.applicationStage = 'Document Upload';
    }
    
    await loan.save();

    res.status(201).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all documents for a loan
// @route   GET /api/documents/loan/:loanId
// @access  Private
exports.getDocumentsByLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    // Check if loan exists and belongs to the user
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view documents for this loan'
      });
    }

    const documents = await Document.find({ loan: loanId });

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to simulate data extraction based on document type
function simulateDataExtraction(documentType) {
  const data = {};
  
  switch(documentType) {
    case 'Aadhaar':
      data.name = 'John Doe';
      data.aadhaarNumber = '1234 5678 9012';
      data.dob = '1990-01-01';
      data.address = '123 Main St, Bangalore, Karnataka';
      break;
    case 'PAN':
      data.name = 'John Doe';
      data.panNumber = 'ABCDE1234F';
      data.dob = '1990-01-01';
      break;
    case 'Income Proof':
      data.employerName = 'Tech Solutions Inc.';
      data.income = 75000;
      data.employmentType = 'Salaried';
      data.employmentDuration = 24; // months
      break;
    default:
      break;
  }
  
  return data;
}