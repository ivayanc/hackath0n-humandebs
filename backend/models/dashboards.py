from __future__ import annotations

from pydantic import BaseModel


class RegionStatistic(BaseModel):
    region_name: str
    open_requests: int

class PublicDashboardDTO(BaseModel):
    closed_requests: int
    active_requests: int
    active_volunteers: int
    top5_regions: list[RegionStatistic]
