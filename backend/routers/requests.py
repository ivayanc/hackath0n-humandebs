from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.user import User

from models.requests import ReadRequestDTO

from services.requests import RequestService
from services.auth import AuthService


router = APIRouter(
    prefix='/requests',
    tags=['requests']
)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list(user: User = Depends(AuthService.get_current_user)) -> list[ReadRequestDTO]:
    return RequestService.list()
