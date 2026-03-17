from flask import Blueprint, jsonify


main_bp = Blueprint("main", __name__)

@main_bp.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Member Portal API"}), 200

@main_bp.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({"message": "Welcome to the Dashboard!"}), 200

@main_bp.route("/profile", methods=["GET"])
def profile():
    return jsonify({"message": "User Profile Data"}), 200
