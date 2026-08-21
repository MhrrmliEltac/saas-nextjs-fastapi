import uuid
from fastapi import HTTPException, status
from app.models.performance import PerformanceReview, ReviewStatus
from app.schemas.performance import (
    RequestPerformance,
    RequestUpdatePerformance,
    ResponsePerformance,
)
from app.schemas.success import SuccessResponse
from app.services.log_service import create_log


async def get_performance() -> list[ResponsePerformance]:
    return await PerformanceReview.all()


async def get_performance_by_id(id: uuid.UUID) -> ResponsePerformance:
    record = await PerformanceReview.get_or_none(id=id)

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bu id ilə performans qiymətləndirməsi yoxdu",
        )
    return record


async def create_performance(payload: RequestPerformance, actor: str) -> SuccessResponse:
    record = await PerformanceReview.create(**payload.model_dump())
    await create_log(actor, "performans qiymətləndirməsi başlatdı", record.employee)
    return {"success": True, "message": "Performans qiymətləndirməsi uğurla yaradıldı!"}


async def update_performance(
    id: uuid.UUID, payload: RequestUpdatePerformance, actor: str
) -> SuccessResponse:
    record = await PerformanceReview.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bu id ilə performans qiymətləndirməsi yoxdu",
        )

    update_data = payload.model_dump(exclude_unset=True)
    just_completed = (
        update_data.get("status") == ReviewStatus.COMPLETED
        and record.status != ReviewStatus.COMPLETED
    )

    record.update_from_dict(update_data)
    await record.save()

    action = (
        "performans qiymətləndirməsini tamamladı"
        if just_completed
        else "performans qiymətləndirməsini yenilədi"
    )
    await create_log(actor, action, record.employee)
    return {"success": True, "message": "Performans qiymətləndirməsi uğurla dəyişdirildi!"}


async def delete_performance(id: uuid.UUID, actor: str) -> SuccessResponse:
    record = await PerformanceReview.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bu id ilə performans qiymətləndirməsi yoxdu",
        )
    employee = record.employee
    await record.delete()
    await create_log(actor, "performans qiymətləndirməsini sildi", employee)
    return {"success": True, "message": "Performans qiymətləndirməsi uğurla silindi!"}
