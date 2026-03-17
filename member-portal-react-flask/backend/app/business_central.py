import json
import os
import requests
from dotenv import load_dotenv

load_dotenv()

BC_USERNAME = os.getenv("BC_USERNAME", "demo_user")
BC_PASSWORD = os.getenv("BC_PASSWORD", "demo_password")
BC_MEMBERS_TABLE = os.getenv("BC_MEMBERS_TABLE", "http://localhost:7048/BC/ODataV4/Company('DEMO')/MemberList")
BC_PORTAL_USERS_TABLE = os.getenv("BC_PORTAL_USERS_TABLE", "http://localhost:7048/BC/ODataV4/Company('DEMO')/portalUsers")


def get_member_from_bc(email):
    """Check if a member exists in the external system."""
    url = BC_MEMBERS_TABLE
    print(f"Checking member endpoint: {url}")
    response = requests.get(url, auth=(BC_USERNAME, BC_PASSWORD))

    if response.status_code == 200:
        data = response.json()
        if "value" in data:
            for member in data["value"]:
                if member.get('E_Mail') == email:
                    return member
        return None
    else:
        print(f"Member API error: {response.status_code} - {response.text}")
        return None


def get_member_from_Portal_users(email):
    """Check if a member exists in the portal users table."""
    url = BC_PORTAL_USERS_TABLE
    print(f"Checking portal users endpoint: {url}")
    response = requests.get(url, auth=(BC_USERNAME, BC_PASSWORD))

    if response.status_code == 200:
        data = response.json()
        if "value" in data:
            for member in data["value"]:
                if member.get('Email') == email:
                    return member
        return None
    else:
        print(f"Portal API error: {response.status_code} - {response.text}")
        return None


def is_user_already_registered(email):
    url = BC_PORTAL_USERS_TABLE
    response = requests.get(url, auth=(BC_USERNAME, BC_PASSWORD))

    if response.status_code == 200:
        data = response.json()
        if "value" in data:
            return any(member.get('Email') == email for member in data["value"])
    return False


def register_portal_user(data):
    """Register a user in the portal users table."""
    print("Sending JSON data to the external system:")
    print(json.dumps(data, indent=4))

    response = requests.post(BC_PORTAL_USERS_TABLE, json=data, auth=(BC_USERNAME, BC_PASSWORD))
    if response.status_code == 201:
        return True
    print(f"Failed to register user. Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
    return False


def authenticate_user(email, password):
    member = get_member_from_bc(email)
    if member and member.get("password") == password:
        return member
    return None
