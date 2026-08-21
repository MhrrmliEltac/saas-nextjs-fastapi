import uuid
from typing import Optional
from pydantic import BaseModel, Field

from app.models.payroll import PayrollStatus


class RequestPayroll(BaseModel):
    employee: str
    position: str
    base_salary: float = Field(ge=0)
    bonus: float = Field(default=0, ge=0)
    status: PayrollStatus = PayrollStatus.PENDING


class RequestUpdatePayroll(BaseModel):
    employee: Optional[str] = None
    position: Optional[str] = None
    base_salary: Optional[float] = Field(default=None, ge=0)
    bonus: Optional[float] = Field(default=None, ge=0)
    status: Optional[PayrollStatus] = None


class ResponsePayroll(BaseModel):
    id: uuid.UUID
    employee: str
    position: str
    base_salary: float
    bonus: float
    status: PayrollStatus
