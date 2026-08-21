import uuid
from fastapi import HTTPException, status
from app.models.recruitment import OpenPosition
from app.schemas.recruitment import (
    RequestPosition,
    RequestUpdatePosition,
    RequestUpdateStage,
    ResponsePosition,
)
from app.schemas.success import SuccessResponse
from app.services.log_service import create_log

STAGE_LABELS = {
    "open": "Açıq",
    "interviewing": "Müsahibə",
    "offer": "Təklif",
}


async def get_positions() -> list[ResponsePosition]:
    return await OpenPosition.all()


async def get_position_by_id(id: uuid.UUID) -> ResponsePosition:
    position = await OpenPosition.get_or_none(id=id)

    if not position:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə vakansiya yoxdu"
        )
    return position


async def create_position(payload: RequestPosition, actor: str) -> SuccessResponse:
    position = await OpenPosition.create(**payload.model_dump())
    await create_log(actor, "yeni vakansiya əlavə etdi", position.title)
    return {"success": True, "message": "Vakansiya uğurla yaradıldı!"}


async def update_position(
    id: uuid.UUID, payload: RequestUpdatePosition, actor: str
) -> SuccessResponse:
    position = await OpenPosition.get_or_none(id=id)
    if not position:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə vakansiya yoxdu"
        )

    position.update_from_dict(payload.model_dump(exclude_unset=True))
    await position.save()
    await create_log(actor, "vakansiyanı yenilədi", position.title)
    return {"success": True, "message": "Vakansiya uğurla dəyişdirildi!"}


async def update_position_stage(
    id: uuid.UUID, payload: RequestUpdateStage, actor: str
) -> SuccessResponse:
    position = await OpenPosition.get_or_none(id=id)
    if not position:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə vakansiya yoxdu"
        )

    position.stage = payload.stage
    await position.save()
    await create_log(
        actor,
        "vakansiyanın mərhələsini dəyişdi",
        f"{position.title} → {STAGE_LABELS[payload.stage.value]}",
    )
    return {"success": True, "message": "Vakansiyanın mərhələsi uğurla dəyişdirildi!"}


async def delete_position(id: uuid.UUID, actor: str) -> SuccessResponse:
    position = await OpenPosition.get_or_none(id=id)
    if not position:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə vakansiya yoxdu"
        )
    title = position.title
    await position.delete()
    await create_log(actor, "vakansiyanı sildi", title)
    return {"success": True, "message": "Vakansiya uğurla silindi!"}
