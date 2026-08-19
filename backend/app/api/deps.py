import jwt
from fastapi import Depends, HTTPException, Request, status

from app.core.security import check_role, decode_token
from app.models.user import User

ACCESS_COOKIE_NAME = "access_token"


async def get_current_user(request: Request) -> User:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Etibarsız və ya vaxtı bitmiş access token",
    )

    token = request.cookies.get(ACCESS_COOKIE_NAME)
    if token is None:
        raise credentials_error

    try:
        payload = decode_token(token)
    except jwt.PyJWTError:
        raise credentials_error

    if payload.get("type") != "access":
        raise credentials_error

    user = await User.get_or_none(id=payload.get("sub")).select_related("role")
    if user is None:
        raise credentials_error

    return user


async def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if not check_role(current_user.role.name):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu əməliyyat üçün ADMIN rolu tələb olunur",
        )
    return current_user
