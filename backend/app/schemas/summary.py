from pydantic import BaseModel


class ResponseSummary(BaseModel):
    employee_count: int
    leave_count: int
    leave_pending_count: int
