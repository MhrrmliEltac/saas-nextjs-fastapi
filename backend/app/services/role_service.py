import uuid
from app.schemas.success import SuccessResponse
from fastapi import HTTPException, status
from app.schemas.role import RequestRole, ResponseRole
from app.models.roles import Role


async def create_role(payload: RequestRole):
    if await Role.get_or_none(name=payload.name):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Bu rol adı artıq qeydiyyatdan keçib",
        )
    return await Role.create(name=payload.name)


async def update_role(id: uuid.UUID, payload: RequestRole):
    role = await Role.get_or_none(id=id)
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Belə bir rol yoxdur"
        )
    update_role = payload.model_dump(exclude_unset=True)

    role.update_from_dict(update_role)
    new_role = await role.save()

    return {"data": new_role}


async def get_role() -> list[ResponseRole]:
    return await Role.all()


async def get_role_by_id(id: uuid.UUID) -> ResponseRole:
    role = await Role.get_or_none(id=id)
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Belə bir rol yoxdur"
        )
    return role


async def delete_role(id: uuid) -> SuccessResponse:
    role = await Role.get_or_none(id=id)
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Belə bir rol yoxdur"
        )
    await role.delete()
    return {"message": "Rol uğurla silindi", "success": True}
