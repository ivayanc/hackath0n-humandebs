from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.user import User

from models.routes import CreateRouteDTO, ReadLightRouteDTO

from services.auth import AuthService
from services.routes import RouteService

router = APIRouter(
    prefix='/routes',
    tags=['routes']
)


@router.post('/generate', status_code=status.HTTP_200_OK)
async def generate(dto: CreateRouteDTO, user: User = Depends(AuthService.get_current_user)) -> ReadLightRouteDTO:
    return RouteService.create(dto, user.id)
