import uuid
from pydantic import BaseModel


class ResponseLog(BaseModel):
    id: uuid.UUID
    actor: str
    action: str
    target: str
    time: str


class ResponseWeeklyActivity(BaseModel):
    day: str
    value: int
