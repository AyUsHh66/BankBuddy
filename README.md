# Virtual Bank Manager - Conversation Flow

└── Loan_type
    
    ├── Personal_loan

    ├── Home_loan
    
    └── Auto_loan
    
        └── Eligibility_check
    
            ├── Rejected
    
            │   └── Alternatives
    
            │       └── Acceptance_nxt (if accepted)
    
            └── Identity_verification
    
                └── Income_verification
    
                    └── Document_collection
    
                        ├── Property_doc (if Home_loan)
    
                        ├── Auto_doc (if Auto_loan)
    
                        └── Application_complete
    
                            └── Approved
    
                                └── Acceptance_nxt
# BankBuddy - Your Virtual Bank Manager
#### Want loans, but don't wanna make physical visits? This solution is for you!!
## Overview

Welcome to the Financial Interaction Application! This innovative platform is designed to streamline the process of answering structured financial questions through video responses, ensuring a more engaging and efficient experience. Our application leverages advanced technologies such as facial recognition, Optical Character Recognition (OCR), and Natural Language Processing (NLP) to provide a seamless user experience.

## Features

- **User -Friendly Interface**: Start with a general introduction and welcoming message.
- **Video Responses**: Users can respond to questions via video instead of filling out lengthy forms.
- **Facial Recognition**: Ensures the same person is interacting throughout the session.
- **Text Input Option**: For users who prefer to type or cannot speak loudly, a text input space is provided.
- **Document Submission**: Users can submit documents via camera or file upload, with OCR technology extracting important details such as:
  - Name
  - Date of Birth
  - Income
  - Employment Type
- **Application Status**: Based on user and document data, applications can be:
  - Approved
  - Rejected (with reasons provided)
  - Request for More Information
- **Optimized OCR**: The OCR system adapts to low light conditions and improper alignment for better accuracy.

## Future Improvements

### Next Version Enhancements

- **ID Verification**: Ensure submitted IDs (e.g., Aadhaar, PAN) are valid and not random.
- **Session Timeout**: Automatic termination of the session after 5-7 minutes of inactivity.

### Addressing User Pain Points

- **Long or Repetitive Interactions**: Introduce a skill-edit option for users who prefer text-based responses.
- **Poor Lighting/Image Quality**: Implement a manual verification fallback for document submissions.
- **Facial Verification Issues**: Address potential problems due to lighting, camera quality, or technical glitches with randomized re-verification (2-3 times).
- **User  Support**: Provide a "Talk to Human" option for live chat or scheduled calls to assist users who may get stuck or lost.
- **Customizable Avatars**: Allow users to change their avatar according to their preferences.
- **Enhanced Interaction**: Utilize sentiment analysis and NLP techniques for more personalized responses.
- **Multilingual Support**: Incorporate different accents and languages to cater to a diverse user base.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/financial-interaction-app.git
