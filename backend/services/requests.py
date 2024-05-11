from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.request import Request

from models.requests import CreateRequestDTO

from services.regions import RegionsService


class RequestService:

    @staticmethod
    def create(dto: CreateRequestDTO) -> Request:
        instance = dto.to_orm()
        nearest_region = RegionsService.get_nearest_region(instance.last_location_longitude, instance.last_location_latitude)
        instance.region = nearest_region
        with session() as s:
            s.add(instance)
            s.commit()
            s.refresh(instance)
        return instance

    @staticmethod
    def count_requests(is_closed: bool = False) -> int:
        with session() as s:
            return s.query(Request).filter(Request.is_closed==is_closed).count()

    @staticmethod
    def list(is_closed: bool = False) -> list[Request]:
        with session() as s:
            return s.query(Request).filter(Request.is_closed == is_closed).all()

    @staticmethod
    def count_requests_in_region(region_id: int) -> int:
        with session() as s:
            return s.query(Request).filter(Request.region_id == region_id).count()
