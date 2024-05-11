from __future__ import annotations

from pydantic import BaseModel


class PublicDashboardDTO(BaseModel):
    closed_requests: int
    active_requests: int
    active_volunteers: int
