from __future__ import annotations

from pydantic import BaseModel

from database.models.user import User


class TokensDTO(BaseModel):
    access_token: str
    refresh_token: str
