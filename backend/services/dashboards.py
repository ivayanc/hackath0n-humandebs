from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.user import User

from models.dashboards import PublicDashboardDTO

from services.requests import RequestService
from services.users import UserService


class PublicDashboardService:

    @staticmethod
    def get() -> PublicDashboardDTO:
        return PublicDashboardDTO(
            closed_requests=RequestService.count_requests(is_closed=True),
            active_requests=RequestService.count_requests(is_closed=False),
            active_volunteers=UserService.count_users(is_active=True)
        )
