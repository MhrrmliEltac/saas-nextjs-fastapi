import uuid
from fastapi import APIRouter, Depends, status
from app.api.deps import require_admin
from app.models.user import User
from app.schemas.role import ResponseRole, RequestRole
from app.services.role_service import (
    create_role,
    get_role,
    delete_role,
    update_role,
    get_role_by_id,
)
from app.api.deps import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.post(
    "/create", response_model=ResponseRole, status_code=status.HTTP_201_CREATED
)
async def role(payload: RequestRole):
    role = await create_role(payload)
    return ResponseRole(
        id=role.id,
        name=role.name,
    )


@router.patch("/update/:id", dependencies=[Depends(require_admin)])
async def role(id: uuid.UUID, payload: RequestRole):
    return await update_role(id, payload)


@router.get("/list", response_model=list[ResponseRole])
async def role():
    return await get_role()


@router.get("/:id", response_model=ResponseRole)
async def role(id: uuid.UUID):
    return await get_role_by_id(id)


@router.delete("/delete/:id")
async def role(id: uuid.UUID):
    return await delete_role(id)
