import uuid
from typing import Optional
from pydantic import BaseModel, Field

from app.models.performance import ReviewStatus


class RequestPerformance(BaseModel):
    employee: str
    period: str
    reviewer: str


class RequestUpdatePerformance(BaseModel):
    employee: Optional[str] = None
    period: Optional[str] = None
    reviewer: Optional[str] = None
    score: Optional[float] = Field(default=None, ge=0, le=5)
    status: Optional[ReviewStatus] = None


class ResponsePerformance(BaseModel):
    id: uuid.UUID
    employee: str
    period: str
    reviewer: str
    score: float
    status: ReviewStatus
