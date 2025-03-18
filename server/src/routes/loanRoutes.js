const express = require('express');
const { 
  createLoan, 
  getLoans, 
  getLoan, 
  updateLoan, 
  submitLoan 
} = require('../controllers/loanController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createLoan)
  .get(protect, getLoans);

router.route('/:id')
  .get(protect, getLoan)
  .put(protect, updateLoan);

router.route('/:id/submit')
  .put(protect, submitLoan);

module.exports = router;