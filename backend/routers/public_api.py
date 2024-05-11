from typing import Union

from fastapi import APIRouter, Depends, status

from database.base import Session
from database.models.request import Request

from models.requests import CreateRequestDTO, ReadRequestDTO

from services.requests import RequestService

from utils.database import get_db

router = APIRouter(
    prefix='/public_api',
    tags=['public_api']
)


@router.post("/request/create/", status_code=status.HTTP_201_CREATED)
async def create_request(dto: CreateRequestDTO, db: Session = Depends(get_db)) -> ReadRequestDTO:
    instance = RequestService.create(dto)
    return instance
