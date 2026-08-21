import uuid
from fastapi import APIRouter, Depends, status
from app.services.performance_service import (
    create_performance,
    get_performance,
    get_performance_by_id,
    update_performance,
    delete_performance,
)
from app.api.deps import get_current_user, require_hr_role
from app.schemas.performance import (
    RequestPerformance,
    RequestUpdatePerformance,
    ResponsePerformance,
)
from app.schemas.success import SuccessResponse
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponsePerformance])
async def performance():
    return await get_performance()


@router.get("/{id}", response_model=ResponsePerformance)
async def performance(id: uuid.UUID):
    return await get_performance_by_id(id)


@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def performance(
    payload: RequestPerformance, current_user: User = Depends(get_current_user)
):
    return await create_performance(
        payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.put(
    "/update/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def performance(
    id: uuid.UUID,
    payload: RequestUpdatePerformance,
    current_user: User = Depends(get_current_user),
):
    return await update_performance(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.delete(
    "/delete/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def performance(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await delete_performance(
        id, actor=f"{current_user.name} {current_user.surname}"
    )
