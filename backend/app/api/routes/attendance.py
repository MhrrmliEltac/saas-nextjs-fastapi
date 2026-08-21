import uuid
from fastapi import APIRouter, Depends, status
from app.services.attendance_service import (
    create_attendance,
    get_attendance,
    get_today_attendance,
    get_attendance_by_id,
    update_attendance,
    delete_attendance,
)
from app.api.deps import get_current_user, require_hr_role
from app.schemas.attendance import (
    RequestAttendance,
    RequestUpdateAttendance,
    ResponseAttendance,
)
from app.schemas.success import SuccessResponse
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponseAttendance])
async def attendance():
    return await get_attendance()


@router.get("/today", response_model=list[ResponseAttendance])
async def attendance():
    return await get_today_attendance()


@router.get("/{id}", response_model=ResponseAttendance)
async def attendance(id: uuid.UUID):
    return await get_attendance_by_id(id)


@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def attendance(
    payload: RequestAttendance, current_user: User = Depends(get_current_user)
):
    return await create_attendance(
        payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.put(
    "/update/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def attendance(
    id: uuid.UUID,
    payload: RequestUpdateAttendance,
    current_user: User = Depends(get_current_user),
):
    return await update_attendance(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.delete(
    "/delete/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def attendance(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await delete_attendance(
        id, actor=f"{current_user.name} {current_user.surname}"
    )
