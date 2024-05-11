from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.user import User

from models.region import ReadRegionDTO

from services.regions import RegionsService
from services.auth import AuthService


router = APIRouter(
    prefix='/regions',
    tags=['regions']
)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list(user: User = Depends(AuthService.get_current_user)) -> list[ReadRegionDTO]:
    return RegionsService.list()
