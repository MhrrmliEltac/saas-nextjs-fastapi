from enum import Enum

from tortoise import models, fields


class AttendanceStatus(str, Enum):
    PRESENT = "present"
    LATE = "late"
    ABSENT = "absent"
    REMOTE = "remote"


class Attendance(models.Model):
    id = fields.UUIDField(pk=True)
    employee = fields.TextField()
    department = fields.TextField()
    date = fields.DateField()
    check_in = fields.CharField(max_length=5, null=True)
    check_out = fields.CharField(max_length=5, null=True)
    status = fields.CharEnumField(AttendanceStatus, max_length=32)
