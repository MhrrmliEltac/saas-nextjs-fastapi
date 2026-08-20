import uuid
from fastapi import APIRouter, Depends, status
from app.services.leave_service import (
    create_leave,
    get_leave,
    get_leave_count,
    get_pending_leave,
    get_leave_by_id,
    update_leave,
    update_leave_status,
    delete_leave,
)
from app.api.deps import get_current_user, require_hr_role
from app.schemas.leave import (
    RequestLeave,
    RequestUpdateLeave,
    RequestUpdateStatusLeave,
    ResponseLeave,
)
from app.schemas.success import SuccessResponse
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponseLeave])
async def leave():
    return await get_leave()


@router.get("/count", response_model=int)
async def leave():
    return await get_leave_count()


@router.get("/pending", response_model=list[ResponseLeave])
async def leave():
    return await get_pending_leave()


@router.get("/{id}", response_model=ResponseLeave)
async def leave(id: uuid.UUID):
    return await get_leave_by_id(id)


@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def leave(
    payload: RequestLeave, current_user: User = Depends(get_current_user)
):
    return await create_leave(
        payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.put("/update/{id}", response_model=SuccessResponse)
async def leave(
    id: uuid.UUID,
    payload: RequestUpdateLeave,
    current_user: User = Depends(get_current_user),
):
    return await update_leave(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.patch("/update/{id}/status", response_model=SuccessResponse)
async def leave(
    id: uuid.UUID,
    status: RequestUpdateStatusLeave,
    current_user: User = Depends(get_current_user),
):
    return await update_leave_status(
        id, status, actor=f"{current_user.name} {current_user.surname}"
    )


@router.delete("/delete/{id}", response_model=SuccessResponse)
async def leave(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await delete_leave(id, actor=f"{current_user.name} {current_user.surname}")
