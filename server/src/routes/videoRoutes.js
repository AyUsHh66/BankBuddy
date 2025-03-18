const express = require('express');
const { 
  getVideoResponse, 
  storeUserResponse 
} = require('../controllers/videoController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/response', protect, getVideoResponse);
router.post('/user-response', protect, storeUserResponse);

module.exports = router;