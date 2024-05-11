from __future__ import annotations

import googlemaps

from typing import Union

from datetime import datetime

from configuration import GOOGLE_MAPS_API_KEY

class GoogleMapService:
    def __init__(self: GoogleMapService):
        self.client = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

    def generate_checkpoints(self: GoogleMapService, start_point: tuple[float], waypoints: tuple[tuple[float]]) -> Union[int, tuple[tuple[float]]]:
        directions_result = self.client.directions(start_point,
                                                  start_point,
                                                  mode="driving",
                                                  waypoints=waypoints,
                                                  optimize_waypoints=True,
                                                  departure_time=datetime.now())
        route = directions_result[0]
        total_duration = sum(leg['duration']['value'] for leg in route['legs'][:-1])

        optimized_order = route['waypoint_order']
        optimized_route = [point for point in optimized_order]

        return total_duration, optimized_route
