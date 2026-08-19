import uuid
from fastapi import APIRouter, status, Depends
from app.services.department_service import (
    create_department,
    get_department,
    get_department_by_id,
    update_department,
    delete_department,
)
from app.schemas.success import SuccessResponse
from app.schemas.department import (
    RequestDepartment,
    ResponseDepartment,
    RequestUpdateDepartment,
)
from app.api.deps import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponseDepartment])
async def department():
    return await get_department()


@router.get("/{id}", response_model=ResponseDepartment)
async def department(id: uuid.UUID):
    return await get_department_by_id(id)


@router.post(
    "/create", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse
)
async def department(payload: RequestDepartment):
    return await create_department(payload)


@router.put("/update/{id}", response_model=SuccessResponse)
async def department(id: uuid.UUID, payload: RequestUpdateDepartment):
    return await update_department(id, payload)


@router.delete("/delete/{id}", response_model=SuccessResponse)
async def department(id: uuid.UUID):
    return await delete_department(id)
