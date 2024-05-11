from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session

from models.region import ReadRegionDTO

from services.regions import RegionsService


router = APIRouter(
    prefix='/regions',
    tags=['regions']
)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list() -> list[ReadRegionDTO]:
    return RegionsService.list()
