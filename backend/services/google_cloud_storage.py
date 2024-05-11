from __future__ import annotations

import os

from datetime import timedelta
from uuid import uuid4
from pathlib import Path

from google.cloud import storage

from configuration import GOOGLE_CLOUD_ACCOUNT_SETTINGS


class GoogleCloudStorage:
    def __init__(self: GoogleCloudStorage):
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_CLOUD_ACCOUNT_SETTINGS
        self.storage_client = storage.Client()
        self.bucket = self.storage_client.bucket('hackhaton-images')

    def upload_file(self: GoogleCloudStorage, filename: str, content: str, content_type: str) -> str:
        extension = Path(filename).suffix
        filename = f'{uuid4()}{extension}'
        blob = self.bucket.blob(filename)
        blob.upload_from_string(content, content_type=content_type)

        return filename

    def generate_url(self: GoogleCloudStorage, filename: str):
        blob = self.bucket.blob(filename)
        url = blob.generate_signed_url(expiration=timedelta(minutes=15), method='GET')
        return url
