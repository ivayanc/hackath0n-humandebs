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
            if nearest_value is None or nearest_value > distance:
                nearest_value = distance
                nearest_region = region
        return nearest_region

    @staticmethod
    def get_nearest_regions(longitude: float, latitude: float, max_distance: float) -> Optional[Region]:
        from services.requests import RequestService

        regions = RegionsService.list()
        results = []
        for region in regions:
            distance = region.calculate_distance(longitude, latitude)
            print(distance, region.id)
            if distance > max_distance:
                continue
            requests_count = RequestService.count_requests_in_region(region.id)
            print(requests_count)
            if requests_count == 0:
                continue
            results.append((region.latitude, region.longitude, distance, region.id))
        results = sorted(results, key = lambda x: x[2])
        return results
