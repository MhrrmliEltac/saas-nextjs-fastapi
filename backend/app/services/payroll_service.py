import uuid
from fastapi import HTTPException, status
from app.models.payroll import Payroll, PayrollStatus
from app.schemas.payroll import (
    RequestPayroll,
    RequestUpdatePayroll,
    ResponsePayroll,
)
from app.schemas.success import SuccessResponse
from app.services.log_service import create_log


async def get_payroll() -> list[ResponsePayroll]:
    return await Payroll.all()


async def get_payroll_by_id(id: uuid.UUID) -> ResponsePayroll:
    record = await Payroll.get_or_none(id=id)

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə maaş qeydi yoxdu"
        )
    return record


async def create_payroll(payload: RequestPayroll, actor: str) -> SuccessResponse:
    record = await Payroll.create(**payload.model_dump())
    await create_log(actor, "maaş qeydi əlavə etdi", record.employee)
    return {"success": True, "message": "Maaş qeydi uğurla yaradıldı!"}


async def update_payroll(
    id: uuid.UUID, payload: RequestUpdatePayroll, actor: str
) -> SuccessResponse:
    record = await Payroll.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə maaş qeydi yoxdu"
        )

    record.update_from_dict(payload.model_dump(exclude_unset=True))
    await record.save()
    await create_log(actor, "maaş qeydini yenilədi", record.employee)
    return {"success": True, "message": "Maaş qeydi uğurla dəyişdirildi!"}


async def mark_payroll_paid(id: uuid.UUID, actor: str) -> SuccessResponse:
    record = await Payroll.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə maaş qeydi yoxdu"
        )

    record.status = PayrollStatus.PAID
    await record.save()
    await create_log(actor, "maaşı ödədi", record.employee)
    return {"success": True, "message": "Maaş ödənildi olaraq qeyd edildi!"}


async def delete_payroll(id: uuid.UUID, actor: str) -> SuccessResponse:
    record = await Payroll.get_or_none(id=id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bu id ilə maaş qeydi yoxdu"
        )
    employee = record.employee
    await record.delete()
    await create_log(actor, "maaş qeydini sildi", employee)
    return {"success": True, "message": "Maaş qeydi uğurla silindi!"}
