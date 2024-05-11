from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel

from database.models.regions import Region


class CreateRouteDTO(BaseModel):
    longitude: float
    latitude: float
    max_distance: float
    max_time: int


class ReadLightRouteDTO(BaseModel):
    id: int
    route_time: int
    created_at: datetime
