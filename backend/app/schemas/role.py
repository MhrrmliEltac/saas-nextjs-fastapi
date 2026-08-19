import uuid
from pydantic import BaseModel, ConfigDict


class RequestRole(BaseModel):
    name: str


class ResponseRole(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
