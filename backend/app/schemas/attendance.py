import re
import uuid
from datetime import date as date_
from typing import Optional
from pydantic import BaseModel, Field, field_validator

from app.models.attendance import AttendanceStatus

TIME_PATTERN = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")


def _validate_time(value: Optional[str]) -> Optional[str]:
    if value is not None and not TIME_PATTERN.fullmatch(value):
        raise ValueError("Vaxt formatı HH:MM olmalıdır")
    return value


class RequestAttendance(BaseModel):
    employee: str
    department: str
    date: date_ = Field(default_factory=date_.today)
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    status: AttendanceStatus

    @field_validator("check_in", "check_out")
    @classmethod
    def validate_time(cls, value: Optional[str]) -> Optional[str]:
        return _validate_time(value)


class RequestUpdateAttendance(BaseModel):
    employee: Optional[str] = None
    department: Optional[str] = None
    date: Optional[date_] = None
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    status: Optional[AttendanceStatus] = None

    @field_validator("check_in", "check_out")
    @classmethod
    def validate_time(cls, value: Optional[str]) -> Optional[str]:
        return _validate_time(value)


class ResponseAttendance(BaseModel):
    id: uuid.UUID
    employee: str
    department: str
    date: date_
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    status: AttendanceStatus
