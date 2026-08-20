from app.models.worker import Worker
from app.models.leave import Leave, LeaveStatus
from app.schemas.summary import ResponseSummary


async def get_summary() -> ResponseSummary:
    employee_count = await Worker.all().count()
    leave_count = await Leave.all().count()
    leave_pending_count = await Leave.filter(status=LeaveStatus.PENDING).count()

    return ResponseSummary(
        employee_count=employee_count,
        leave_count=leave_count,
        leave_pending_count=leave_pending_count,
    )
