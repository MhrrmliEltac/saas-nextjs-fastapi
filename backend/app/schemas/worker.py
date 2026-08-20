import uuid
from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator

from app.models.worker import WorkerStatus


class RequestWorker(BaseModel):
    name: str
    surname: str
    email: EmailStr
    phone_number: str
    department: str
    started_work: date
    status: WorkerStatus = WorkerStatus.ACTIVE

    @field_validator("started_work")
    @classmethod
    def started_work_not_in_future(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("payload.started_work hal-hazırki vaxtdan əvvəl ola bilməz")
        return value


class RequestUpdateWorker(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    department: Optional[str] = None
    started_work: Optional[date] = None
    status: Optional[WorkerStatus] = None

    @field_validator("started_work")
    @classmethod
    def started_work_not_in_future(cls, value: Optional[date]) -> Optional[date]:
        if value is not None and value < date.today():
            raise ValueError("payload.started_work hal-hazırki vaxtdan əvvəl ola bilməz")
        return value


class ResponseWorker(BaseModel):
    id: uuid.UUID
    fullname: str
    name: str
    surname: str
    email: EmailStr
    phone_number: str
    department: str
    started_work: date
    status: WorkerStatus
