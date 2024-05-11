from __future__ import annotations

from fastapi import UploadFile

from services.google_cloud_storage import GoogleCloudStorage

from database.base import session
from database.models.attachments import Attachment

class AttachmentService:

    @staticmethod
    async def upload_file(file: UploadFile) -> Attachment:
        filename = file.filename
        content = await file.read()
        content_type = file.content_type
        filename = GoogleCloudStorage().upload_file(filename=filename, content=content, content_type=content_type)
        instance = Attachment(
            file_name=filename
        )
        with session() as s:
            s.add(instance)
            s.commit()
        return instance
