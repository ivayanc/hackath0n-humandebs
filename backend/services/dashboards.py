from __future__ import annotations

from typing import Optional

from database.base import session
from database.models.user import User

from models.dashboards import PublicDashboardDTO, RegionStatistic

from services.requests import RequestService
from services.users import UserService
from services.regions import RegionsService


class PublicDashboardService:

    @staticmethod
    def get() -> PublicDashboardDTO:
        top5_regions = RegionsService.get_top5_regions()
        regions = [RegionStatistic(**region) for region in top5_regions]
        return PublicDashboardDTO(
            closed_requests=RequestService.count_requests(is_closed=True),
            active_requests=RequestService.count_requests(is_closed=False),
            active_volunteers=UserService.count_users(is_active=True),
            top5_regions=regions
        )
