from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.user import User

from models.region import ReadRegionDTO, ReadRegionPlaceDTO

from services.regions import RegionsService, RegionPlaceService
from services.auth import AuthService


router = APIRouter(
    prefix='/regions',
    tags=['regions']
)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list_regions(user: User = Depends(AuthService.get_current_user)) -> list[ReadRegionDTO]:
    return RegionsService.list()


@router.get('/{region_id}/places', status_code=status.HTTP_200_OK)
async def list_region_places(region_id: int, user: User = Depends(AuthService.get_current_user)) -> list[ReadRegionPlaceDTO]:
    return RegionPlaceService.get_places_by_region(region_id)
