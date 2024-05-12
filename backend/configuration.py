import os

from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv('DB_URL')

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_REFRESH_SECRET_KEY = os.getenv('JWT_REFRESH_SECRET_KEY')

GOOGLE_CLOUD_ACCOUNT_SETTINGS = os.getenv('GOOGLE_CLOUD_ACCOUNT_SETTINGS')
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')

ORIGINS = os.getenv('ORIGINS').split(';')