from dotenv import load_dotenv
import os
from flask import Flask
from flask_mail import Mail
from flask_cors import CORS

mail = Mail()
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["MAIL_SERVER"] = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    app.config["MAIL_PORT"] = int(os.getenv("SMTP_PORT", "587"))
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USERNAME"] = os.getenv("EMAIL_SENDER", "")
    app.config["MAIL_PASSWORD"] = os.getenv("EMAIL_PASSWORD", "")
    app.config["MAIL_DEFAULT_SENDER"] = os.getenv("EMAIL_SENDER", "")

    CORS(app)
    mail.init_app(app)

    from app.auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    from app.main.routes import main_bp
    app.register_blueprint(main_bp, url_prefix="/main")

    return app
