import uuid
from datetime import date as date_
from typing import Optional
from pydantic import BaseModel, Field

from app.models.recruitment import PositionStage


class RequestPosition(BaseModel):
    title: str
    department: str
    candidates: int = Field(default=0, ge=0)
    stage: PositionStage = PositionStage.OPEN
    posted_date: date_ = Field(default_factory=date_.today)


class RequestUpdatePosition(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    candidates: Optional[int] = Field(default=None, ge=0)
    posted_date: Optional[date_] = None


class RequestUpdateStage(BaseModel):
    stage: PositionStage


class ResponsePosition(BaseModel):
    id: uuid.UUID
    title: str
    department: str
    candidates: int
    stage: PositionStage
    posted_date: date_
