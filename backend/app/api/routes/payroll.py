import uuid
from fastapi import APIRouter, Depends, status
from app.services.payroll_service import (
    create_payroll,
    get_payroll,
    get_payroll_by_id,
    update_payroll,
    mark_payroll_paid,
    delete_payroll,
)
from app.api.deps import get_current_user, require_hr_role
from app.schemas.payroll import (
    RequestPayroll,
    RequestUpdatePayroll,
    ResponsePayroll,
)
from app.schemas.success import SuccessResponse
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponsePayroll])
async def payroll():
    return await get_payroll()


@router.get("/{id}", response_model=ResponsePayroll)
async def payroll(id: uuid.UUID):
    return await get_payroll_by_id(id)


@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def payroll(
    payload: RequestPayroll, current_user: User = Depends(get_current_user)
):
    return await create_payroll(
        payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.put(
    "/update/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def payroll(
    id: uuid.UUID,
    payload: RequestUpdatePayroll,
    current_user: User = Depends(get_current_user),
):
    return await update_payroll(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.patch(
    "/update/{id}/pay",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def payroll(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await mark_payroll_paid(
        id, actor=f"{current_user.name} {current_user.surname}"
    )


@router.delete(
    "/delete/{id}",
    response_model=SuccessResponse,
    dependencies=[Depends(require_hr_role)],
)
async def payroll(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await delete_payroll(id, actor=f"{current_user.name} {current_user.surname}")
