const Video = require('../models/videoModel');
const User = require('../models/userModel');
const Loan = require('../models/loanModel');

// @desc    Get appropriate video response
// @route   POST /api/videos/response
// @access  Private
exports.getVideoResponse = async (req, res) => {
  try {
    const { stage, context, language } = req.body;

    // Get user's preferred language
    const user = await User.findById(req.user.id);
    const preferredLanguage = language || user.preferredLanguage || 'English';

    // Find appropriate video response based on stage and context
    let videoKey;
    let nextAction;
    let questions = [];

    switch(stage) {
      case 'intro':
        videoKey = 'welcome';
        nextAction = 'loan_selection';
        questions = [
          "What type of loan are you looking for today?",
          "How much would you like to borrow?",
          "What is the purpose of your loan?"
        ];
        break;
      
      case 'loan_selection':
        videoKey = 'loan_options';
        nextAction = 'document_upload';
        questions = [
          "What is your monthly income?",
          "What is your employment type?",
          "How long have you been employed at your current job?"
        ];
        break;
      
      case 'document_upload':
        videoKey = 'document_requirements';
        nextAction = 'verification';
        questions = [
          "Please upload your Aadhaar card",
          "Please upload your PAN card",
          "Please upload your income proof"
        ];
        break;
      
      case 'verification':
        videoKey = 'verification_process';
        nextAction = 'decision';
        questions = [
          "We're verifying your details. Please confirm your contact information is correct.",
          "Is there anything else you would like to share about your loan application?"
        ];
        break;
      
      case 'decision_approved':
        videoKey = 'loan_approval';
        nextAction = 'completion';
        questions = [
          "Congratulations! Your loan has been approved.",
          "Would you like to review your loan terms?"
        ];
        break;
      
      case 'decision_rejected':
        videoKey = 'loan_rejection';
        nextAction = 'feedback';
        questions = [
          "Unfortunately, your loan application has been rejected.",
          "Would you like to know the reasons for rejection?"
        ];
        break;
      
      case 'more_info':
        videoKey = 'additional_information';
        nextAction = 'document_upload';
        questions = [
          "We need some additional information to process your application.",
          "Please provide the requested documents."
        ];
        break;
      
      default:
        videoKey = 'general_assistance';
        nextAction = 'intro';
        questions = [
          "How can I assist you today?",
          "Would you like to apply for a loan?"
        ];
    }

    // In a real application, we would fetch the actual video URL from a database
    // For this demo, we'll simulate video URLs
    const videoUrl = `/assets/videos/${preferredLanguage.toLowerCase()}/${videoKey}.mp4`;

    res.status(200).json({
      success: true,
      data: {
        videoUrl,
        nextAction,
        questions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Store user's video response
// @route   POST /api/videos/user-response
// @access  Private
exports.storeUserResponse = async (req, res) => {
  try {
    const { loanId, stage, responseData } = req.body;

    // Check if the loan exists and belongs to the user
    if (loanId) {
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
          message: 'Not authorized for this loan'
        });
      }
    }

    // In a real application, we would store the video response
    // For this demo, we'll just acknowledge receipt
    
    res.status(200).json({
      success: true,
      message: 'Video response received',
      data: {
        nextStage: getNextStage(stage)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to determine the next stage
function getNextStage(currentStage) {
  const stageFlow = {
    'intro': 'loan_selection',
    'loan_selection': 'document_upload',
    'document_upload': 'verification',
    'verification': 'decision',
    'decision': 'completion'
  };

  return stageFlow[currentStage] || 'intro';
}