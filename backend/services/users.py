from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.user import User

from models.users import CreateUserDTO


class UserService:

    @staticmethod
    def count_users(is_active: bool = True) -> int:
        with session() as s:
            return s.query(User).filter(User.is_active == is_active).count()

    @staticmethod
    def get(email: str) -> Optional[User]:
        with session() as s:
            return s.query(User).filter(User.is_active == True, User.email==email).first()

    @staticmethod
    def create_user(dto: CreateUserDTO) -> User:
        from services.auth import AuthService
        dto.password = AuthService.hash_pass(dto.password)
        instance = dto.to_orm()
        with session() as s:
            s.add(instance)
            s.commit()
            s.refresh(instance)
        return instance
