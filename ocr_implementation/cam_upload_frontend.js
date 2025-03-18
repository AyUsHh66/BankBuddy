function captureDocumentImage(documentType) {
    const videoElement = document.getElementById('camera-feed');
    const captureButton = document.getElementById('capture-button');
    const fileUpload = document.getElementById('file-upload');
    
    // Set up camera access for live capture
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoElement.srcObject = stream;
        videoElement.style.display = 'block';
        captureButton.style.display = 'block';
      })
      .catch(err => {
        console.error("Camera access error:", err);
        // Fallback to file upload only
        fileUpload.style.display = 'block';
      });
    
    // Capture image from camera
    captureButton.onclick = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0);
      
      // Convert to blob and process
      canvas.toBlob(blob => {
        processDocumentImage(blob, documentType);
        // Stop camera stream
        videoElement.srcObject.getTracks().forEach(track => track.stop());
      });
    };
    
    // Process uploaded file
    fileUpload.onchange = (e) => {
      const file = e.target.files[0];
      processDocumentImage(file, documentType);
    };
  }