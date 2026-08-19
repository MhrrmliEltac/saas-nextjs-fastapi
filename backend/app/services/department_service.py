import uuid
from fastapi import HTTPException, status
from app.models.department import DepartmentModel
from app.schemas.department import (
    RequestDepartment,
    ResponseDepartment,
    RequestUpdateDepartment,
)
from app.schemas.success import SuccessResponse


async def get_department() -> list[ResponseDepartment]:
    return await DepartmentModel.all()


async def get_department_by_id(id: uuid.UUID) -> ResponseDepartment:
    department = await DepartmentModel.get_or_none(id=id)

    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə department yoxdu"
        )
    return department


async def create_department(payload: RequestDepartment) -> SuccessResponse:

    if await DepartmentModel.get_or_none(name=payload.name):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Eyni department adı 1 dəfə istifadə oluna bilər",
        )
    await DepartmentModel.create(name=payload.name, head=payload.head)
    return {"success": True, "message": "Departament uğurla yaradıldı!"}


async def update_department(
    id: uuid.UUID, payload: RequestUpdateDepartment
) -> SuccessResponse:
    department = await DepartmentModel.get_or_none(id=id)
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə department yoxdu"
        )
    update_department = payload.model_dump(exclude_unset=True)

    department.update_from_dict(update_department)
    await department.save()
    return {"message": "Departament uğurla dəyişdirildi!", "success": True}


async def delete_department(id: uuid.UUID) -> SuccessResponse:
    department = await DepartmentModel.get_or_none(id=id)
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə department yoxdu"
        )
    await department.delete()
    return {"message": "Departament uğurla silindi!", "success": True}
