const express = require('express');
const { 
  uploadDocument, 
  getDocumentsByLoan,
  upload 
} = require('../controllers/documentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, upload.single('document'), uploadDocument);
router.get('/loan/:loanId', protect, getDocumentsByLoan);

module.exports = router;