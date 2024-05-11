from __future__ import annotations

from pydantic import BaseModel

from database.models.regions import Region


class ReadRegionDTO(BaseModel):
    id: int
    region_name: str
    longitude: float
    latitude: float
