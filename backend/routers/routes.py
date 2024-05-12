from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.user import User

from models.routes import CreateRouteDTO, ReadLightRouteDTO, ReadRouteCheckpointDTO

from services.auth import AuthService
from services.routes import RouteService, RouteCheckpointService

router = APIRouter(
    prefix='/routes',
    tags=['routes']
)


@router.post('/generate', status_code=status.HTTP_200_OK)
async def generate(dto: CreateRouteDTO, user: User = Depends(AuthService.get_current_user)) -> ReadLightRouteDTO:
    return RouteService.create(dto, user.id)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list_routes(user: User = Depends(AuthService.get_current_user)) -> list[ReadLightRouteDTO]:
    return RouteService.list()


@router.get('/{route_id}/checkpoints', status_code=status.HTTP_200_OK)
async def get_checkpoints(route_id: int, user: User = Depends(AuthService.get_current_user)) -> list[ReadRouteCheckpointDTO]:
    return RouteCheckpointService.get_checkpoints_by_route(route_id)
