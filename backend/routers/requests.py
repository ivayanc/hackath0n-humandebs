from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session

from models.requests import ReadRequestDTO

from services.requests import RequestService


router = APIRouter(
    prefix='/requests',
    tags=['requests']
)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list() -> list[ReadRequestDTO]:
    return RequestService.list()
