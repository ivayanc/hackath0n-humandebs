from __future__ import annotations

from pydantic import BaseModel
from datetime import datetime

from database.models.request import Request

from models.region import ReadRegionDTO
from models.users import ReadUserDTO


class CreateRequestDTO(BaseModel):
    first_name: str
    last_name: str
    surname: str
    description: str
    completed_actions: str
    phone_number: str
    contact_first_name: str
    contact_last_name: str
    contact_surname: str
    contact_phone_number: str
    probably_dead: bool
    is_soldier: bool
    last_location_longitude: float
    last_location_latitude: float
    attachment_id: int

    def to_orm(self: CreateRequestDTO) -> Request:
        return Request(
            first_name=self.first_name,
            last_name=self.last_name,
            surname=self.surname,
            description=self.description,
            completed_actions=self.completed_actions,
            phone_number=self.phone_number,
            contact_first_name=self.contact_first_name,
            contact_last_name=self.contact_last_name,
            contact_surname=self.contact_surname,
            contact_phone_number=self.contact_phone_number,
            probably_dead=self.probably_dead,
            is_soldier=self.is_soldier,
            last_location_longitude=self.last_location_longitude,
            last_location_latitude=self.last_location_latitude,
            attachment_id=self.attachment_id
        )


class ReadRequestDTO(BaseModel):
    id: int
    first_name: str
    last_name: str
    surname: str
    description: str
    completed_actions: str
    phone_number: str
    contact_first_name: str
    contact_last_name: str
    contact_surname: str
    contact_phone_number: str
    probably_dead: bool
    is_soldier: bool
    last_location_longitude: float
    last_location_latitude: float
    region: ReadRegionDTO
    photo: str
    comments: list[ReadRequestCommentDTO]

class PostCommentDTO(BaseModel):
    comment: str


class ReadRequestCommentDTO(BaseModel):
    text: str
    created_by: ReadUserDTO
    created_at: datetime
