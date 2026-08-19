from fastapi import APIRouter, Depends, HTTPException, Request, Response, status

from app.api.deps import get_current_user
from app.core.config import settings
from app.models.user import User
from app.schemas.user import (
    MessageResponse,
    RequestLogin,
    RequestRegister,
    ResponseUser,
)
from app.services.user_service import (
    authenticate_user,
    issue_tokens,
    refresh_tokens,
    register_user,
)

router = APIRouter()

REFRESH_COOKIE_NAME = "refresh_token"
ACCESS_COOKIE_NAME = "access_token"


def _set_auth_cookies(
    response: Response, access_token: str, refresh_token: str
) -> None:
    is_production = settings.ENVIRONMENT == "production"
    response.set_cookie(
        key=ACCESS_COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=is_production,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=is_production,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        path="/auth/refresh",
    )


def _clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(ACCESS_COOKIE_NAME, path="/")
    response.delete_cookie(REFRESH_COOKIE_NAME, path="/auth/refresh")


@router.post(
    "/register", response_model=ResponseUser, status_code=status.HTTP_201_CREATED
)
async def register(payload: RequestRegister):
    return await register_user(payload)


@router.post("/login", response_model=MessageResponse)
async def login(payload: RequestLogin, response: Response):
    user = await authenticate_user(payload)
    tokens = issue_tokens(user)
    _set_auth_cookies(response, tokens.access_token, tokens.refresh_token)
    return MessageResponse(status=status.HTTP_200_OK, message="Giriş uğurlu oldu")


@router.post("/refresh", response_model=MessageResponse)
async def refresh(request: Request, response: Response):
    refresh_token = request.cookies.get(REFRESH_COOKIE_NAME)
    if refresh_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token tapılmadı",
        )
    tokens = await refresh_tokens(refresh_token)
    _set_auth_cookies(response, tokens.access_token, tokens.refresh_token)
    return MessageResponse(status=status.HTTP_200_OK, message="Token yeniləndi")


@router.post("/logout", response_model=MessageResponse)
async def logout(response: Response):
    _clear_auth_cookies(response)
    return MessageResponse(status=status.HTTP_200_OK, message="Çıxış edildi")


@router.get("/me", response_model=ResponseUser)
async def me(current_user: User = Depends(get_current_user)):
    return current_user
