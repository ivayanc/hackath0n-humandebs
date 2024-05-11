from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.regions import Region


class RegionsService:

    @staticmethod
    def list() -> list[Region]:
        with session() as s:
            regions = s.query(Region).all()
        return regions

    @staticmethod
    def get_nearest_region(longitude: float, latitude: float) -> Optional[Region]:
        regions = RegionsService.list()
        nearest_value, nearest_region = None, None
        for region in regions:
            distance = region.calculate_distance(longitude, latitude)
            if not nearest_value or nearest_value > distance:
                nearest_value = distance
                nearest_region = region
        return nearest_region
