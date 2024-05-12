from __future__ import annotations

from typing import Optional
from datetime import datetime

import sqlalchemy as sa

from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.base import Base

from utils.calculations import haversine

class Region(Base):
    __tablename__ = 'regions'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    region_name: Mapped[str]
    longitude: Mapped[float]
    latitude: Mapped[float]

    def __repr__(self):
        return f'Region {self.id}'

    def calculate_distance(self: Region, longitude: float, latitude: float) -> float:
        return haversine(self.latitude, self.longitude, latitude, longitude)


class RegionPlace(Base):
    __tablename__ = 'region_places'
    id: Mapped[int] = mapped_column(sa.BigInteger(), primary_key=True, autoincrement=True)
    region_id: Mapped[int] = mapped_column(sa.ForeignKey("regions.id"))
    region = relationship("Region")
    place_name: Mapped[str]
    longitude: Mapped[float]
    latitude: Mapped[float]
