from typing import Union

from fastapi import APIRouter, Depends, status, File, UploadFile

from database.base import Session
from database.models.request import Request

from models.requests import CreateRequestDTO, ReadRequestDTO
from models.dashboards import PublicDashboardDTO
from models.attachments import ReadAttachmentDTO

from services.requests import RequestService
from services.dashboards import PublicDashboardService
from services.attachments import AttachmentService


router = APIRouter(
    prefix='/public_api',
    tags=['public_api']
)


@router.post('/upload/file', status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...)) -> ReadAttachmentDTO:
    return await AttachmentService.upload_file(file)

@router.post("/request/create/", status_code=status.HTTP_201_CREATED)
async def create_request(dto: CreateRequestDTO) -> ReadRequestDTO:
    instance = RequestService.create(dto)
    return instance


@router.get("/dashboard/", status_code=status.HTTP_200_OK)
async def create_request() -> PublicDashboardDTO:
    return PublicDashboardService.get()
