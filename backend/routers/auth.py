from typing import Union

from fastapi import APIRouter, Depends, status, HTTPException

from database.base import Session

from models.users import CreateUserDTO, ReadUserDTO, LoginUserDTO, RefreshDTO
from models.auth import TokensDTO

from services.users import UserService
from services.auth import AuthService, AuthException

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
    try:
        return AuthService.login(dto)
    except AuthException as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=str(e))


@router.post('/refresh/', response_model=TokensDTO)
def refresh(dto: RefreshDTO):
    try:
        return AuthService.refresh(dto)
    except AuthException as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=str(e))