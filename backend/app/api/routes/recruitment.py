import uuid
from fastapi import APIRouter, Depends, status
from app.services.recruitment_service import (
    create_position,
    get_positions,
    get_position_by_id,
    update_position,
    update_position_stage,
    delete_position,
)
from app.api.deps import get_current_user, require_hr_role
from app.schemas.recruitment import (
    RequestPosition,
    RequestUpdatePosition,
    RequestUpdateStage,
    ResponsePosition,
)
from app.schemas.success import SuccessResponse
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponsePosition])
async def recruitment():
    return await get_positions()


@router.get("/{id}", response_model=ResponsePosition)
async def recruitment(id: uuid.UUID):
    return await get_position_by_id(id)


@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def recruitment(
    payload: RequestPosition, current_user: User = Depends(get_current_user)
):
    return await create_position(
        payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.put(
    "/update/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def recruitment(
    id: uuid.UUID,
    payload: RequestUpdatePosition,
    current_user: User = Depends(get_current_user),
):
    return await update_position(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.patch(
    "/update/{id}/stage",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def recruitment(
    id: uuid.UUID,
    payload: RequestUpdateStage,
    current_user: User = Depends(get_current_user),
):
    return await update_position_stage(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.delete(
    "/delete/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def recruitment(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await delete_position(id, actor=f"{current_user.name} {current_user.surname}")
