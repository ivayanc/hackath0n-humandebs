from __future__ import annotations

import base64

from fastapi import UploadFile

from services.google_cloud_storage import GoogleCloudStorage

from database.base import session
from database.models.attachments import Attachment

from models.attachments import CreateAttachmentDTO


class AttachmentService:

    @staticmethod
    async def upload_file(dto: CreateAttachmentDTO) -> Attachment:
        filename = GoogleCloudStorage().upload_file(dto.file_data)
        instance = Attachment(
            file_name=filename
        )
        with session() as s:
            s.add(instance)
            s.commit()
        return instance
