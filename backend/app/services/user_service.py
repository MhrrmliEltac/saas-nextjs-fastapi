import jwt
from fastapi import HTTPException, status

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.roles import Role
from app.models.user import User
from app.schemas.user import RequestLogin, RequestRegister, TokenResponse

DEFAULT_ROLE_NAME = "USER"


async def register_user(payload: RequestRegister) -> User:
    if await User.get_or_none(email=payload.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Bu email artıq qeydiyyatdan keçib",
        )

    if payload.role:
        role = await Role.get_or_none(name=payload.role)
        if role is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Göstərilən rol tapılmadı",
            )
    else:
        role, _ = await Role.get_or_create(name=DEFAULT_ROLE_NAME)

    return await User.create(
        name=payload.name,
        surname=payload.surname,
        email=payload.email,
        password=hash_password(payload.password),
        role=role,
    )


async def authenticate_user(payload: RequestLogin) -> User:
    user = await User.get_or_none(email=payload.email)
    if user is None or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email və ya şifrə yanlışdır",
        )
    return user


def issue_tokens(user: User) -> TokenResponse:
    user_id = str(user.id)
    return TokenResponse(
        access_token=create_access_token(user_id),
        refresh_token=create_refresh_token(user_id),
    )


async def refresh_tokens(refresh_token: str) -> TokenResponse:
    try:
        payload = decode_token(refresh_token)
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token etibarsızdır",
        )

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token etibarsızdır",
        )

    user = await User.get_or_none(id=payload["sub"])
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="İstifadəçi tapılmadı",
        )

    return issue_tokens(user)
