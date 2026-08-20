from enum import Enum
from tortoise import models, fields


class LeaveType(str, Enum):
    YEAR = "İllik"
    ILLNESS = "Xəstəlik"
    FREE = "Ödənişsiz"


class LeaveStatus(str, Enum):
    PENDING = "Gözləyir"
    SUCCESS = "Təsdiqləndi"
    REJECT = "Rədd edildi"


class Leave(models.Model):
    id = fields.UUIDField(pk=True)
    employee = fields.TextField()
    type = fields.CharEnumField(LeaveType, max_length=32)
    start_leave = fields.DateField()
    end_leave = fields.DateField()
    day = fields.IntField()
    status = fields.CharEnumField(
        LeaveStatus, max_length=32, default=LeaveStatus.PENDING
    )
