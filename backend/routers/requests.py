from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.user import User

from models.requests import ReadRequestDTO, PostCommentDTO, ReadRequestCommentDTO

from services.requests import RequestService
from services.auth import AuthService


router = APIRouter(
    prefix='/requests',
    tags=['requests']
)


@router.get('/list', status_code=status.HTTP_200_OK)
async def list_requests(user: User = Depends(AuthService.get_current_user)) -> list[ReadRequestDTO]:
    return RequestService.list()


@router.get('/list/{region_id}', status_code=status.HTTP_200_OK)
async def list_requests_by_region_id(region_id: int, user: User = Depends(AuthService.get_current_user)) -> list[ReadRequestDTO]:
    return RequestService.list_requests_by_region_id(region_id)


@router.post('/{request_id}/post_comment', status_code=status.HTTP_201_CREATED)
async def post_comment(request_id: int, dto: PostCommentDTO, user: User = Depends(AuthService.get_current_user)) -> ReadRequestCommentDTO:
    return RequestService.post_comment(dto, request_id, user.id)


@router.post('/{request_id}/close', status_code=status.HTTP_201_CREATED)
async def close_request(request_id: int, user: User = Depends(AuthService.get_current_user)) -> str:
    RequestService.close_request(request_id)
    return "Finished"
