// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const onboardingScreen = document.getElementById('onboarding-screen');
const verificationScreen = document.getElementById('verification-screen');
const documentScreen = document.getElementById('document-screen');
const startApplicationBtn = document.getElementById('start-application');
const continueToVerificationBtn = document.getElementById('continue-to-verification');
const continueToDocumentsBtn = document.getElementById('continue-to-documents');
const consentCheckboxes = document.querySelectorAll('.consent-checkbox');
const documentTabs = document.querySelectorAll('.document-tab');
const backButtons = document.querySelectorAll('.back-button');

// State Management
let currentScreen = 'welcome-screen';
const consents = {
  videoRecording: false,
  documentScanning: false,
  dataUsage: false
};

// Navigation Functions
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  // Show the target screen
  document.getElementById(screenId).classList.add('active');
  currentScreen = screenId;
  // Update progress bar if needed
  updateProgressBar();
}

function updateProgressBar() {
  const progressSteps = {
    'welcome-screen': 0,
    'onboarding-screen': 16.6,
    'verification-screen': 33.2,
    'document-screen': 49.8,
    // Add more screens as they are implemented
  };
  if (progressSteps[currentScreen]) {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
      fill.style.width = progressSteps[currentScreen] + '%';
    });
  }
}

function goBack() {
  const screenOrder = [
    'welcome-screen',
    'onboarding-screen',
    'verification-screen',
    'document-screen'
    // Add more screens as they are implemented
  ];
  const currentIndex = screenOrder.indexOf(currentScreen);
  if (currentIndex > 0) {
    showScreen(screenOrder[currentIndex - 1]);
  }
}

// Consent Management
function updateConsentState() {
  const allConsentsGiven = Object.values(consents).every(value => value === true);
  continueToVerificationBtn.disabled = !allConsentsGiven;
}

function handleConsentChange(event) {
  const consentType = event.target.dataset.consent;
  consents[consentType] = event.target.checked;
  updateConsentState();
}

// Document Tab Management
function setActiveTab(event) {
  // Remove active class from all tabs
  documentTabs.forEach(tab => {
    tab.classList.remove('active');
  });
  // Add active class to clicked tab
  event.target.classList.add('active');
  // In a real application, you would show/hide document sections here
}

// Event Listeners
startApplicationBtn.addEventListener('click', () => {
  showScreen('onboarding-screen');
});

continueToVerificationBtn.addEventListener('click', () => {
  showScreen('verification-screen');
});

continueToDocumentsBtn.addEventListener('click', () => {
  showScreen('document-screen');
});

consentCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleConsentChange);
});

documentTabs.forEach(tab => {
  tab.addEventListener('click', setActiveTab);
});

backButtons.forEach(button => {
  button.addEventListener('click', goBack);
});

// Video simulation (for demo purposes)
const playButton = document.querySelector('.play-button');
if (playButton) {
  playButton.addEventListener('click', () => {
    const videoText = document.querySelector('.video-text');
    videoText.innerHTML = `
      <h3>Hello! Welcome to LoanGuide.</h3>
      <p>I'm your AI loan advisor. I'll guide you through the loan application process.</p>
      <p>The process is simple and should take about 15 minutes. You'll need your ID documents and proof of income ready.</p>
      <p>Shall we get started?</p>
    `;
  });
}

// Simulated verification steps (for demo purposes)
let verificationStepIndex = 0;
const verificationSteps = document.querySelectorAll('.verification-steps .step');
function simulateVerificationStep() {
  if (verificationStepIndex < verificationSteps.length) {
    // Complete the current step
    verificationSteps[verificationStepIndex].classList.add('completed');
    verificationSteps[verificationStepIndex].querySelector('i').className = 'fas fa-check-circle';
    // Move to the next step
    verificationStepIndex++;
    // If there are more steps, schedule the next one
    if (verificationStepIndex < verificationSteps.length) {
      setTimeout(simulateVerificationStep, 2000);
    }
  }
}

// Document preview functionality
const cameraButton = document.querySelector('.upload-button.camera');
const fileButton = document.querySelector('.upload-button.file');
const documentUpload = document.querySelector('.document-upload');
const documentPreview = document.querySelector('.document-preview');
function showDocumentPreview() {
  documentUpload.style.display = 'none';
  documentPreview.style.display = 'grid';
  // In a real app, you would show the actual uploaded document
  const previewImage = document.querySelector('.preview-image');
  previewImage.innerHTML = `
    <i class="fas fa-file-image"></i>
  `;
}

// Additional functionality for video recording and document upload
const videoRecordButton = document.getElementById('video-record-button');
if (videoRecordButton) {
  videoRecordButton.addEventListener('click', () => {
    // Implement video recording functionality here
    console.log('Video recording started');
  });
}

const documentUploadButton = document.getElementById('document-upload-button');
if (documentUploadButton) {
  documentUploadButton.addEventListener('click', () => {
    // Implement document upload functionality here
    console.log('Document uploaded');
  });
}

// Initialize the application
showScreen('welcome-screen');
