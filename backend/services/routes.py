from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.routes import Route, RouteCheckpoint

from models.routes import CreateRouteDTO, ReadLightRouteDTO

from services.regions import RegionsService
from services.google_maps import GoogleMapService

class RouteService:

    @staticmethod
    def create(dto: CreateRouteDTO, user_id: int) -> Route:
        longitude = dto.longitude
        latitude = dto.latitude
        max_distance = dto.max_distance
        max_time = dto.max_time
        regions_to_check_begin = RegionsService.get_nearest_regions(longitude, latitude, max_distance)
        regions_to_check = [f'{region[0]}, {region[1]}' for region in regions_to_check_begin]
        start_location_name = GoogleMapService().get_city(latitude, longitude)
        start_point = f'{latitude}, {longitude}'
        total_time, optimized_regions = GoogleMapService().generate_checkpoints(start_point, regions_to_check)
        while total_time > max_time:
            regions_to_check = regions_to_check[:-1]
            total_time, optimized_regions = GoogleMapService().generate_checkpoints(start_point, regions_to_check)
        ordered_regions = [regions_to_check_begin[i][3] for i in optimized_regions]

        route_instance = Route(
            route_location=start_location_name,
            route_time=total_time,
            created_by_id=user_id
        )
        checkpoints = []
        for idx, region in enumerate(ordered_regions):
            checkpoints.append(RouteCheckpoint(
                region_id=region,
                position=idx,
                route=route_instance
            ))
        with session() as s:
            s.add(route_instance)
            for checkpoint in checkpoints:
                s.add(checkpoint)
            s.commit()
        return route_instance

    @staticmethod
    def list() -> list[Route]:
        with session() as s:
            return s.query(Route).all()


class RouteCheckpointService:
    @staticmethod
    def get_checkpoints_by_route(route_id: int) -> list[RouteCheckpoint]:
        with session() as s:
            return s.query(RouteCheckpoint).filter(RouteCheckpoint.route_id == route_id).all()
