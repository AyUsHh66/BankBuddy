import pytesseract
from PIL import Image
import cv2
import numpy as np
import re
import sys

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

def preprocess_image(image_path):
    """Preprocess image for better OCR results (handles rotation, noise, lighting)"""
    img = cv2.imread(image_path)

    if img is None:
        raise FileNotFoundError(f"Error: Unable to read image file '{image_path}'. Check the path.")

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Adaptive thresholding for better visibility under poor lighting
    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # Noise removal using morphology
    kernel = np.ones((1, 1), np.uint8)
    cleaned = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=1)

    # Detect and correct rotation
    rotated = correct_skew(cleaned)

    return rotated

def correct_skew(image):
    """Detect and correct skew in the image using Hough Line Transform"""
    edges = cv2.Canny(image, 50, 150, apertureSize=3)
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=50, maxLineGap=5)

    if lines is not None:
        angles = []
        for line in lines:
            x1, y1, x2, y2 = line[0]
            angle = np.arctan2(y2 - y1, x2 - x1) * 180 / np.pi
            angles.append(angle)

        if angles:
            median_angle = np.median(angles)

            # Rotate the image to correct skew
            (h, w) = image.shape[:2]
            center = (w // 2, h // 2)
            rotation_matrix = cv2.getRotationMatrix2D(center, median_angle, 1.0)
            rotated = cv2.warpAffine(image, rotation_matrix, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
            return rotated

    return image  # Return the original if no skew detected

def extract_fields(text, document_type):
    """Extract relevant fields based on document type"""
    extracted_fields = {}

    if document_type not in PATTERNS:
        print(f"Unsupported document type: {document_type}")
        return {}

    for field_name, pattern in PATTERNS[document_type].items():
        matches = re.search(pattern, text)
        if matches:
            extracted_fields[field_name] = matches.group(1).strip() if matches.groups() else matches.group(0).strip()

    return extracted_fields

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <image_path> <document_type>")
        sys.exit(1)

    image_path = sys.argv[1]
    document_type = sys.argv[2].lower()

    if document_type not in PATTERNS:
        print(f"Error: Unsupported document type '{document_type}'")
        sys.exit(1)

    try:
        # Preprocess the image (handles lighting, rotation, noise)
        processed_img = preprocess_image(image_path)

        # Convert processed image to PIL format
        pil_img = Image.fromarray(processed_img)

        # Perform OCR (supports Hindi & English)
        text = pytesseract.image_to_string(pil_img, lang='eng+hin')

        # Extract fields
        extracted_fields = extract_fields(text, document_type)

        if extracted_fields:
            print(f"\nExtracted Data for {document_type.capitalize()}:")
            for key, value in extracted_fields.items():
                print(f"{key}: {value}")
        else:
            print("No relevant information extracted.")

    except Exception as e:
        print(f"Error: {e}")

# python ocr.py srm_id_front.jpeg aadhaar
# to run