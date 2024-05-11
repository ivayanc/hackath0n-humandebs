from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.user import User

from models.requests import CreateRequestDTO

from services.regions import RegionsService


class UserService:

    @staticmethod
    def count_users(is_active: bool = True) -> int:
        with session() as s:
            return s.query(User).filter(User.is_active == is_active).count()
