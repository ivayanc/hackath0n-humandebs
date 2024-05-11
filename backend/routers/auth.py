from typing import Union

from fastapi import APIRouter, Depends, status

from database.base import Session

from models.users import CreateUserDTO, ReadUserDTO, LoginUserDTO
from models.auth import TokensDTO

from services.users import UserService
from services.auth import AuthService

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


@router.post('/registration/', status_code=status.HTTP_201_CREATED)
def create_users(dto: CreateUserDTO) -> ReadUserDTO:
    instance = UserService.create_user(dto)
    return instance


@router.post('/login/')
def login(dto: LoginUserDTO) -> TokensDTO:
    return AuthService.login(dto)
