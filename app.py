from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Static user details
USER_ID = "sneha_thapa_16072004"
EMAIL = "22BCS15832@cuchd.in"
ROLL_NUMBER = "22BCS15832"

@app.route("/bfhl", methods=["GET"])
def get_operation_code():
    """Handles GET requests by returning a hardcoded operation code."""
    return jsonify({"operation_code": 1}), 200

@app.route("/bfhl", methods=["POST"])
def process_data():
    """Handles POST requests by filtering numbers and alphabets from input."""
    try:
        data = request.get_json()

        if not data or "data" not in data or not isinstance(data["data"], list):
            return jsonify({"is_success": False, "error": "Invalid input format"}), 400
        
        numbers = [item for item in data["data"] if isinstance(item, str) and item.isdigit()]
        alphabets = [item for item in data["data"] if isinstance(item, str) and item.isalpha()]

        highest_alphabet = [max(alphabets, key=lambda x: x.lower())] if alphabets else []

        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
