from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel

from models.region import ReadRegionDTO


class CreateRouteDTO(BaseModel):
    longitude: float
    latitude: float
    max_distance: float
    max_time: int


class ReadLightRouteDTO(BaseModel):
    id: int
    route_location: str
    route_time: int
    created_at: datetime


class ReadRouteCheckpointDTO(BaseModel):
    id: int
    region: ReadRegionDTO
    position: int
    google_map_url: str
