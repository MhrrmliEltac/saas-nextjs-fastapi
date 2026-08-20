import uuid
from enum import Enum
from typing import Optional
from pydantic import BaseModel, ValidationInfo, field_validator
from datetime import date


from app.models.leave import LeaveType, LeaveStatus


class RequestLeave(BaseModel):
    employee: str
    type: LeaveType
    start_leave: date
    end_leave: date
    status: LeaveStatus = LeaveStatus.PENDING

    @field_validator("end_leave")
    @classmethod
    def end_leave_not_high_start_leave(cls, value: date, info: ValidationInfo) -> date:
        start_leave = info.data.get("start_leave")
        if start_leave is not None and value < start_leave:
            raise ValueError(
                "Məzuniyyətin bitmə tarixi başlama tarixindən kiçik ola bilməz"
            )
        return value


class RequestUpdateLeave(BaseModel):
    employee: Optional[str] = None
    type: Optional[LeaveType] = None
    start_leave: Optional[date] = None
    end_leave: Optional[date] = None
    status: Optional[LeaveStatus] = None


class RequestType(str, Enum):
    APPROVE = "approve"
    REJECT = "reject"


class RequestUpdateStatusLeave(BaseModel):
    type: RequestType


class ResponseLeave(BaseModel):
    id: uuid.UUID
    employee: str
    type: LeaveType
    start_leave: date
    end_leave: date
    day: int
    status: LeaveStatus
