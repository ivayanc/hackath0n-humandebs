from __future__ import annotations

import os
import re
import base64

from datetime import timedelta
from uuid import uuid4

from google.cloud import storage

from configuration import GOOGLE_CLOUD_ACCOUNT_SETTINGS


class GoogleCloudStorage:
    def __init__(self: GoogleCloudStorage):
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_CLOUD_ACCOUNT_SETTINGS
        self.storage_client = storage.Client()
        self.bucket = self.storage_client.bucket('hackhaton-images')

    def upload_file(self: GoogleCloudStorage, file_data: str) -> str:
        def get_content_type_and_extension(base64_string):
            if ',' in base64_string:
                header, _ = base64_string.split(',', 1)
            else:
                return None, None

            content_type = header.split(';')[0].replace('data:', '')

            if content_type == "image/jpeg":
                extension = ".jpg"
            elif content_type == "image/png":
                extension = ".png"
            elif content_type == "image/gif":
                extension = ".gif"
            else:
                extension = ""

            return content_type, extension

        content_type, extension = get_content_type_and_extension(file_data)
        if ',' in file_data:
            file_data = file_data.split(',')[1]
        content = base64.b64decode(file_data)
        filename = f'{uuid4()}{extension}'
        blob = self.bucket.blob(filename)
        blob.upload_from_string(content, content_type=content_type)

        return filename

    def generate_url(self: GoogleCloudStorage, filename: str):
        blob = self.bucket.blob(filename)
        url = blob.generate_signed_url(expiration=timedelta(minutes=15), method='GET')
        return url
