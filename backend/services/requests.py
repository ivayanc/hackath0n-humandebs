from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.request import Request, RequestComment

from models.requests import CreateRequestDTO, PostCommentDTO

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
    def list_requests_by_region_id(region_id: int, is_closed: bool = False) -> list[Request]:
        with session() as s:
            return s.query(Request).filter(Request.is_closed == is_closed, Request.region_id == region_id).all()

    @staticmethod
    def count_requests_in_region(region_id: int) -> int:
        with session() as s:
            return s.query(Request).filter(Request.region_id == region_id).count()

    @staticmethod
    def post_comment(dto: PostCommentDTO, request_id: int, user_id: int) -> RequestComment:
        comment = dto.comment
        instance = RequestComment(
            request_id=request_id,
            text=comment,
            created_by_id=user_id
        )
        with session() as s:
            s.add(instance)
            s.commit()
            s.refresh(instance)
        return instance

    @staticmethod
    def close_request(request_id: int) -> None:
        with session() as s:
            request = s.query(Request).filter(Request.id == request_id, Request.is_closed == False).first()
        if not request:
            return
        request.is_closed = True
        with session() as s:
            s.add(request)
            s.commit()
            s.refresh(request)

