import uuid
from datetime import date
from fastapi import HTTPException, status
from app.models.attendance import Attendance
from app.schemas.attendance import (
    RequestAttendance,
    RequestUpdateAttendance,
    ResponseAttendance,
)
from app.schemas.success import SuccessResponse
from app.services.log_service import create_log


async def get_attendance() -> list[ResponseAttendance]:
    return await Attendance.all()


async def get_today_attendance() -> list[ResponseAttendance]:
    return await Attendance.filter(date=date.today())


async def get_attendance_by_id(id: uuid.UUID) -> ResponseAttendance:
    record = await Attendance.get_or_none(id=id)

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə davamiyyət qeydi yoxdu"
        )
    return record


async def create_attendance(payload: RequestAttendance, actor: str) -> SuccessResponse:
    record = await Attendance.create(**payload.model_dump())
    await create_log(actor, "davamiyyət qeydi əlavə etdi", record.employee)
    return {"success": True, "message": "Davamiyyət qeydi uğurla yaradıldı!"}


async def update_attendance(
    id: uuid.UUID, payload: RequestUpdateAttendance, actor: str
) -> SuccessResponse:
    record = await Attendance.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə davamiyyət qeydi yoxdu"
        )

    record.update_from_dict(payload.model_dump(exclude_unset=True))
    await record.save()
    await create_log(actor, "davamiyyət qeydini yenilədi", record.employee)
    return {"success": True, "message": "Davamiyyət qeydi uğurla dəyişdirildi!"}


async def delete_attendance(id: uuid.UUID, actor: str) -> SuccessResponse:
    record = await Attendance.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə davamiyyət qeydi yoxdu"
        )
    employee = record.employee
    await record.delete()
    await create_log(actor, "davamiyyət qeydini sildi", employee)
    return {"success": True, "message": "Davamiyyət qeydi uğurla silindi!"}
