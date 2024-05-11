from typing import Optional
from datetime import datetime

import sqlalchemy as sa

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property

from database.base import Base
from database.models.regions import Region
from database.models.attachments import Attachment
from database.models.user import User

from services.google_cloud_storage import GoogleCloudStorage


class Request(Base):
    __tablename__ = 'requests'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    first_name: Mapped[str]
    last_name: Mapped[str]
    surname: Mapped[str]
    description: Mapped[str]
    completed_actions: Mapped[str]
    phone_number: Mapped[str]
    contact_phone_number: Mapped[str]
    probably_dead: Mapped[bool] = mapped_column(sa.Boolean(), default=False)
    is_soldier: Mapped[bool] = mapped_column(sa.Boolean(), default=False)
    last_location_longitude: Mapped[float]
    last_location_latitude: Mapped[float]
    region_id: Mapped[int] = mapped_column(sa.ForeignKey("regions.id"))
    region = relationship("Region", lazy="selectin")
    attachment_id: Mapped[int] = mapped_column(sa.ForeignKey("attachments.id"))
    attachment = relationship("Attachment", lazy="selectin")
    is_closed: Mapped[bool] = mapped_column(sa.Boolean(), default=False)
    comments = relationship("RequestComment", back_populates="request")

    @hybrid_property
    def photo(self):
        return GoogleCloudStorage().generate_url(self.attachment.file_name)

    def __repr__(self):
        return f'Request {self.id}'


class RequestComment(Base):
    __tablename__ = 'comments'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    request_id: Mapped[int] = mapped_column(sa.ForeignKey("requests.id"))
    request = relationship("Request", back_populates="comments")
    text: Mapped[str]
    created_by_id: Mapped[int] = mapped_column(sa.ForeignKey("users.id"))
    created_by = relationship("Users")
    created_at: Mapped[datetime] = mapped_column(sa.DateTime(), default=datetime.utcnow)
