from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import cv2
import numpy as np
import re
import io
import os
import json

app = Flask(__name__)

# Document-specific extraction patterns
PATTERNS = {
    "aadhaar": {
        "aadhaar_number": r"\d{4}\s\d{4}\s\d{4}",
        "name": r"(?:Name|नाम)[\s:]+([A-Za-z\s]+)",
        "dob": r"(?:DOB|Date of Birth|जन्म तिथि)[\s:]+(\d{2}/\d{2}/\d{4})",
        "gender": r"(?:MALE|FEMALE|Male|Female|पुरुष|महिला)"
    },
    "pan": {
        "pan_number": r"[A-Z]{5}\d{4}[A-Z]",
        "name": r"(?:Name|नाम)[\s:]+([A-Za-z\s]+)",
        "father_name": r"(?:Father|Father's Name|पिता)[\s:]+([A-Za-z\s]+)",
        "dob": r"(?:DOB|Date of Birth|जन्म तिथि)[\s:]+(\d{2}/\d{2}/\d{4})"
    },
    "salary_slip": {
        "name": r"(?:Employee Name|Name|Employee)[\s:]+([A-Za-z\s]+)",
        "employee_id": r"(?:Employee ID|EMP ID|ID)[\s:]+([A-Z0-9]+)",
        "basic_salary": r"(?:Basic|Basic Salary|Basic Pay)[\s:]*(?:Rs\.|₹|INR)?[\s]*(\d+,?\d+\.?\d*)",
        "net_pay": r"(?:Net Pay|Net Salary|Take Home|Total)[\s:]*(?:Rs\.|₹|INR)?[\s]*(\d+,?\d+\.?\d*)"
    }
}

def preprocess_image(image_bytes):
    """Preprocess image for better OCR results"""
    # Convert image bytes to OpenCV format
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply threshold to get black and white image
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Noise removal
    kernel = np.ones((1, 1), np.uint8)
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
    
    return opening

def extract_fields(text, document_type):
    """Extract relevant fields based on document type"""
    extracted_fields = {}
    
    if document_type not in PATTERNS:
        return {"error": f"Unsupported document type: {document_type}"}
    
    # Apply regex patterns for the document type
    for field_name, pattern in PATTERNS[document_type].items():
        matches = re.search(pattern, text)
        if matches:
            # If the pattern has a capture group, use it
            if len(matches.groups()) > 0:
                extracted_fields[field_name] = matches.group(1).strip()
            else:
                extracted_fields[field_name] = matches.group(0).strip()
    
    return extracted_fields

@app.route('/api/ocr/extract', methods=['POST'])
def extract_document_info():
    if 'image' not in request.files:
        return jsonify({"success": False, "error": "No image provided"})
    
    image_file = request.files['image']
    document_type = request.form.get('documentType', '').lower()
    
    if document_type not in PATTERNS:
        return jsonify({"success": False, "error": "Unsupported document type"})
    
    try:
        # Read image file
        image_bytes = image_file.read()
        
        # Preprocess the image
        processed_img = preprocess_image(image_bytes)
        
        # Convert to PIL Image for Tesseract
        pil_img = Image.fromarray(processed_img)
        
        # Perform OCR
        text = pytesseract.image_to_string(pil_img, lang='eng+hin')
        
        # Extract fields based on document type
        extracted_fields = extract_fields(text, document_type)
        
        if not extracted_fields or len(extracted_fields) == 0:
            return jsonify({
                "success": False,
                "error": "Could not extract information from document"
            })
        
        return jsonify({
            "success": True,
            "extractedFields": extracted_fields,
            "documentType": document_type
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })

if __name__ == '__main__':
    app.run(debug=True)