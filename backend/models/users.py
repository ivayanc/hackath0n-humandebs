from __future__ import annotations

from pydantic import BaseModel

from database.models.user import User


class CreateUserDTO(BaseModel):
    email: str
    password: str
    full_name: str
    phone_number: str

    def to_orm(self: CreateUser) -> User:
        return User(
            email=self.email,
            password=self.password,
            full_name=self.full_name,
            phone_number=self.phone_number
        )


class ReadUserDTO(BaseModel):
    id: int
    email: str
    full_name: str
    phone_number: str


class LoginUserDTO(BaseModel):
    email: str
    password: str


class RefreshDTO(BaseModel):
    token: str
    