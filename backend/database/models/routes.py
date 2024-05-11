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


class Route(Base):
    __tablename__ = 'routes'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    route_time: Mapped[int]
    created_by_id: Mapped[int] = mapped_column(sa.ForeignKey("users.id"))
    created_by = relationship("User")
    checkpoints = relationship("RouteCheckpoint", back_populates="route")
    created_at: Mapped[datetime] = mapped_column(sa.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f'Route {self.id}'


class RouteCheckpoint(Base):
    __tablename__ = 'route_checkpoints'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    region_id: Mapped[int] = mapped_column(sa.ForeignKey("regions.id"))
    region = relationship("Region", lazy="selectin")
    route_id: Mapped[int] = mapped_column(sa.ForeignKey("routes.id"))
    route = relationship("Route", back_populates="checkpoints")
    position: Mapped[int]
