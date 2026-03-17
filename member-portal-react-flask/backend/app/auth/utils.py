import json
import os
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

BC_USERNAME = os.getenv("BC_USERNAME", "demo_user")
BC_PASSWORD = os.getenv("BC_PASSWORD", "demo_password")
PORTAL_USERS_ENDPOINT = os.getenv("BC_PORTAL_USERS_TABLE", "http://localhost:7048/BC/ODataV4/Company('DEMO')/portalUsers")

SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "your_email@example.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your_app_password")


def send_email(to_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_SENDER
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_SENDER, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False


def update_bc_user(user_id, update_data):
    """Update a user's details in the portal users table."""
    get_url = f"{PORTAL_USERS_ENDPOINT}(User_ID='{user_id}')"
    get_response = requests.get(get_url, auth=(BC_USERNAME, BC_PASSWORD))

    if get_response.status_code != 200:
        print(f"Failed to retrieve user {user_id} before update. Status Code: {get_response.status_code}")
        print(f"Response Body: {get_response.text}")
        return False

    user_data = get_response.json()
    etag = user_data.get("@odata.etag")
    if not etag:
        print(f"Failed to get @odata.etag for user {user_id}. Update aborted.")
        return False

    headers = {"Content-Type": "application/json", "If-Match": etag}
    payload = json.dumps(update_data)
    patch_response = requests.patch(get_url, data=payload, auth=(BC_USERNAME, BC_PASSWORD), headers=headers)

    if patch_response.status_code in [200, 204]:
        return True
    else:
        print(f"Failed to update user {user_id}. Status Code: {patch_response.status_code}")
        print(f"Response Body: {patch_response.text}")
        return False
