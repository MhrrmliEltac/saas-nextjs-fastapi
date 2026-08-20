from enum import Enum

from tortoise import models, fields


class WorkerStatus(str, Enum):
    ACTIVE = "aktiv"
    ON_LEAVE = "məzuniyyətdə"
    INACTIVE = "deaktiv"


class Worker(models.Model):
    id = fields.UUIDField(pk=True)
    fullname = fields.CharField(max_length=255)
    name = fields.CharField(max_length=255)
    surname = fields.CharField(max_length=255)
    email = fields.CharField(max_length=255)
    phone_number = fields.CharField(max_length=9)
    department = fields.TextField()
    started_work = fields.DateField()
    status = fields.CharEnumField(
        WorkerStatus, max_length=32, default=WorkerStatus.ACTIVE
    )
