from __future__ import annotations

from pydantic import BaseModel


class ReadAttachmentDTO(BaseModel):
    id: int
    file_name: str
