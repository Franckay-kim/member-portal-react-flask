from flask import Blueprint, request, jsonify
from datetime import datetime,timezone, timedelta
import uuid
import bcrypt
import random
import secrets
from .utils import send_email, update_bc_user
from app.business_central import get_member_from_bc, register_portal_user, authenticate_user, is_user_already_registered,get_member_from_Portal_users


auth_bp = Blueprint("auth", __name__)

# Authentication routes
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")

    # Check if the user exists in Business Central members table
    member = get_member_from_bc(email)
    if not member:
        return jsonify({"error": "User is not a registered member"}), 400


    # Check if the user is already registered in the portal users table
    if is_user_already_registered(email):
        return {"error": "User is already registered"}, 400  # HTTP 400 Bad Request
    

    # Generate a unique User ID
    user_id = str(uuid.uuid4())[:20]  # Trim UUID to fit BC Code[50] field

    # Register the user in the portal users table
    portal_user_data = {
        "User_ID": user_id,  
        "Email": email,
        "Full_Name": member.get('Name'),
        "Registered_On": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), 
        "Is_Active": True  
    }
    
    if register_portal_user(portal_user_data):
        # If registration succeeds, generate and send OTP
        otp_response = generate_otp_internal(email)  # Call internal OTP function
        if otp_response["success"]:
            return jsonify({"message": "User registered successfully! OTP sent."}), 201
        else:
            return jsonify({"error": "User registered, but failed to send OTP"}), 500

    return jsonify({"error": "Failed to register user in Business Central"}), 500
    # if register_portal_user(portal_user_data):
    #     return jsonify({"message": "User registered for portal successfully!"}), 201

    # return jsonify({"error": "Failed to register user in Business Central"}), 500


@auth_bp.route('/set-password', methods=['POST'])
def set_password():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")
    new_password = data.get("password")

    user = get_member_from_Portal_users(email)

    # Get the members userid
    user_id = user.get("User_ID")
    print(user_id)

    if not user:
        return jsonify({"error": "User not Registered in the Portal"}), 404

    stored_otp = user.get("OTP")
    otp_expiry = user.get("OTP_Expiry")

    if not stored_otp or not otp_expiry:
        return jsonify({"error": "OTP not generated"}), 400

    # Convert expiry time to datetime object
    otp_expiry_time = datetime.fromisoformat(otp_expiry.rstrip("Z")).replace(tzinfo=timezone.utc)

    if datetime.now(timezone.utc) > otp_expiry_time:
        return jsonify({"error": "OTP expired. Request a new OTP"}), 400

    if otp != stored_otp:
        return jsonify({"error": "Invalid OTP"}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()

    # Save the hashed password in BC and clear OTP
    update_bc_user(user_id, {"Password_Hash": hashed_password, "OTP": "", "OTP_Expiry":""})

    return jsonify({"message": "Password set successfully"}), 200


@auth_bp.route('/login', methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = get_member_from_bc(email)

    if not user:
        return jsonify({"error": "User not found in business Central"}), 404
    
    PortalUser = get_member_from_Portal_users(email)

    if not PortalUser:
        return jsonify({"error": "User not registrered in the Portal"}), 404

    hashed_password = PortalUser.get("Password_Hash")
    # print (f"This is the hashed password: {hashed_password}")
    if not hashed_password or not bcrypt.checkpw(password.encode(), hashed_password.encode()):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful"}), 200


@auth_bp.route('/generate-otp', methods=['POST'])
def generate_otp():
    data = request.json
    email = data.get("email")

    # Check if user is registered in the Portal Users table
    user = get_member_from_Portal_users(email)
    if not user:
        return jsonify({"error": "User not registered in the portal"}), 404

    # Get the members userid
    user_id = user.get("User_ID")
    print(user_id)

    # Generate a secure 6-digit OTP
    otp = str(secrets.randbelow(900000) + 100000)  # Ensures 100000-999999

    # Set OTP expiration time (e.g., 10 minutes)
    expiry_time = (datetime.now(timezone.utc) + timedelta(minutes=10)).isoformat()

    # Update BC with OTP and expiry time
    update_data = {"OTP": otp, "OTP Expiry": expiry_time}  # Ensure these fields exist in BC
    update_success = update_bc_user(user_id, update_data)

    if not update_success:
        return jsonify({"error": "Failed to update OTP in Business Central"}), 500

    # Send OTP via email
    send_email(email, "Portal OTP Code", f"Your OTP code is {otp}. It expires in 10 minutes.")

    return jsonify({"message": "OTP sent successfully"}), 200


def generate_otp_internal(email):
    """Internal function to generate and send OTP"""
    user = get_member_from_Portal_users(email)
    if not user:
        return {"success": False, "error": "User not registered in the portal"}

    # Get the members userid
    user_id = user.get("User_ID")
    print(user_id)

    # Generate a secure 6-digit OTP
    otp = str(secrets.randbelow(900000) + 100000)  

    # Set OTP expiration time (e.g., 10 minutes)
    expiry_time = (datetime.now(timezone.utc) + timedelta(minutes=10)).isoformat()

    # Update BC with OTP
    update_success = update_bc_user(user_id, {"OTP": otp, "OTP_Expiry": expiry_time})
    if not update_success:
        return {"success": False, "error": "Failed to update OTP in BC"}

    # Send OTP via email
    send_email(email, "Portal OTP Code", f"Your OTP code is {otp}. It expires in 10 minutes.")

    return {"success": True}
