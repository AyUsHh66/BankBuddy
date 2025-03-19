from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_document():
    file = request.files['document']
    # Process OCR here...
    return jsonify({"message": "Document received", "status": "Success"})

@app.route('/api/eligibility', methods=['POST'])
def check_eligibility():
    data = request.json
    income = int(data["income"])
    employment = data["employment"]

    # Simple rule-based eligibility check
    if income > 500000 and employment == "Salaried":
        return jsonify({"result": "✅ Approved"})
    else:
        return jsonify({"result": "❌ Rejected"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
