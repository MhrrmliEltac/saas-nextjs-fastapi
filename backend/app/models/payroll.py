from enum import Enum

from tortoise import models, fields


class PayrollStatus(str, Enum):
    PAID = "paid"
    PENDING = "pending"


class Payroll(models.Model):
    id = fields.UUIDField(pk=True)
    employee = fields.TextField()
    position = fields.TextField()
    base_salary = fields.FloatField()
    bonus = fields.FloatField(default=0)
    status = fields.CharEnumField(
        PayrollStatus, max_length=32, default=PayrollStatus.PENDING
    )
