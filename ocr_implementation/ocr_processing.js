function processDocumentImage(imageFile, documentType) {
    // Create form data for API request
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('documentType', documentType);
    
    // Show loading indicator
    showLoadingState("Analyzing document...");
    
    // Send to backend OCR service
    fetch('/api/ocr/extract', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Display extracted fields for verification
        displayExtractedFields(data.extractedFields, documentType);
        // Update application data
        updateApplicationData(documentType, data.extractedFields);
      } else {
        showError("Couldn't process document. Please try again or enter details manually.");
      }
    })
    .catch(error => {
      console.error("OCR processing error:", error);
      showError("An error occurred. Please try again or enter details manually.");
    })
    .finally(() => {
      hideLoadingState();
    });
  }