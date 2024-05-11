from typing import Optional
from datetime import datetime

import sqlalchemy as sa

from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.base import Base
from database.models.regions import Region


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
    is_closed: Mapped[bool] = mapped_column(sa.Boolean(), default=False)

    def __repr__(self):
        return f'Request {self.id}'
