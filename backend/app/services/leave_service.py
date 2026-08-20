import uuid
from fastapi import HTTPException, status
from app.models.leave import Leave, LeaveStatus
from app.schemas.leave import (
    RequestLeave,
    RequestUpdateLeave,
    RequestUpdateStatusLeave,
    ResponseLeave,
)
from app.schemas.success import SuccessResponse
from app.services.log_service import create_log


async def get_leave() -> list[ResponseLeave]:
    return await Leave.all()


async def get_leave_count() -> int:
    leave = await Leave.all()
    return len(leave)


async def get_pending_leave() -> list[ResponseLeave]:
    return await Leave.filter(status=LeaveStatus.PENDING)


async def get_leave_by_id(id: uuid.UUID) -> ResponseLeave:
    leave = await Leave.get_or_none(id=id)

    if not leave:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə məzuniyyət yoxdu"
        )
    return leave


async def create_leave(payload: RequestLeave, actor: str) -> SuccessResponse:

    day = int((payload.end_leave - payload.start_leave).days)

    await Leave.create(**payload.model_dump(), day=day)
    await create_log(
        actor, "məzuniyyət tələbi göndərdi", f"{day} gün, {payload.type.value}"
    )
    return {"success": True, "message": "Məzuniyyət uğurla yaradıldı!"}


async def update_leave(
    id: uuid.UUID, payload: RequestUpdateLeave, actor: str
) -> SuccessResponse:
    leave = await Leave.get_or_none(id=id)
    if not leave:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə məzuniyyət yoxdu"
        )

    update_leave = payload.model_dump(exclude_unset=True)

    start_leave = update_leave.get("start_leave", leave.start_leave)
    end_leave = update_leave.get("end_leave", leave.end_leave)
    if "start_leave" in update_leave or "end_leave" in update_leave:
        if end_leave < start_leave:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Məzuniyyətin bitmə tarixi başlama tarixindən kiçik ola bilməz",
            )
        update_leave["day"] = int((end_leave - start_leave).days)

    leave.update_from_dict(update_leave)
    await leave.save()
    await create_log(actor, "məzuniyyət tələbini yenilədi", leave.employee)
    return {"success": True, "message": "Məzuniyyət uğurla dəyişdirildi!"}


async def update_leave_status(
    id: uuid.UUID, payload: RequestUpdateStatusLeave, actor: str
) -> SuccessResponse:
    leave = await Leave.filter(id=id).first()
    if not leave:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə məzuniyyət yoxdu"
        )

    match payload.type:
        case "approve":
            leave.status = LeaveStatus.SUCCESS
            action = "məzuniyyəti təsdiqlədi"
        case "reject":
            leave.status = LeaveStatus.REJECT
            action = "məzuniyyəti rədd etdi"

    await leave.save()
    await create_log(actor, action, leave.employee)
    return {"success": True, "message": "Məzuniyyətin statusu uğurla dəyişdirildi!"}


async def delete_leave(id: uuid.UUID, actor: str) -> SuccessResponse:
    leave = await Leave.get_or_none(id=id)
    if not leave:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə məzuniyyət yoxdu"
        )
    employee = leave.employee
    await leave.delete()
    await create_log(actor, "məzuniyyət tələbini sildi", employee)
    return {"success": True, "message": "Məzuniyyət uğurla silindi!"}
