import uuid
from fastapi import HTTPException, status
from app.models.worker import Worker
from app.schemas.worker import RequestWorker, RequestUpdateWorker, ResponseWorker
from app.schemas.success import SuccessResponse
from app.services.log_service import create_log


async def get_worker() -> list[ResponseWorker]:
    return await Worker.all()


async def get_worker_by_id(id: uuid.UUID) -> ResponseWorker:
    worker = await Worker.get_or_none(id=id)

    if not worker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə işçi yoxdu"
        )
    return worker


async def worker_list_length() -> int:
    worker = await Worker.all()
    return len(worker)


async def create_worker(payload: RequestWorker, actor: str) -> SuccessResponse:
    if await Worker.get_or_none(email=payload.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Bu email-nən artıq işçi mövcuddur",
        )

    worker = await Worker.create(
        **payload.model_dump(), fullname=f"{payload.name} {payload.surname}"
    )
    await create_log(actor, "yeni işçi əlavə etdi", worker.fullname)
    return {"success": True, "message": "İşçi uğurla yaradıldı!"}


async def update_worker(
    id: uuid.UUID, payload: RequestUpdateWorker, actor: str
) -> SuccessResponse:
    worker = await Worker.get_or_none(id=id)
    if not worker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə işçi yoxdu"
        )

    update_worker = payload.model_dump(exclude_unset=True)
    if "name" in update_worker or "surname" in update_worker:
        update_worker["fullname"] = (
            f"{update_worker.get('name', worker.name)} "
            f"{update_worker.get('surname', worker.surname)}"
        )
    worker.update_from_dict(update_worker)
    await worker.save()
    await create_log(actor, "işçi məlumatlarını yenilədi", worker.fullname)
    return {"success": True, "message": "İşçi uğurla dəyişdirildi!"}


async def delete_worker(id: uuid.UUID, actor: str) -> SuccessResponse:
    worker = await Worker.get_or_none(id=id)
    if not worker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə işçi yoxdu"
        )
    fullname = worker.fullname
    await worker.delete()
    await create_log(actor, "işçini sildi", fullname)
    return {"success": True, "message": "İşçi uğurla silindi!"}
