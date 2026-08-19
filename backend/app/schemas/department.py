import uuid
from pydantic import BaseModel
from typing import Optional


class RequestDepartment(BaseModel):
    name: str
    head: str


class RequestUpdateDepartment(BaseModel):
    name: Optional[str] = None
    head: Optional[str] = None


class ResponseDepartment(BaseModel):
    id: uuid.UUID
    name: str
    head: str
