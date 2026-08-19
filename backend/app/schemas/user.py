import uuid


from pydantic import BaseModel, ConfigDict, EmailStr
from app.schemas.role import ResponseRole


class RequestLogin(BaseModel):
    email: EmailStr
    password: str


class RequestRegister(BaseModel):
    name: str
    surname: str
    email: EmailStr
    password: str
    role: str | None = None


class ResponseUser(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    surname: str
    email: str
    role: ResponseRole


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class MessageResponse(BaseModel):
    status: int
    message: str
