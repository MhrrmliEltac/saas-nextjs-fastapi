from enum import Enum

from tortoise import models, fields


class PositionStage(str, Enum):
    OPEN = "open"
    INTERVIEWING = "interviewing"
    OFFER = "offer"


class OpenPosition(models.Model):
    id = fields.UUIDField(pk=True)
    title = fields.TextField()
    department = fields.TextField()
    candidates = fields.IntField(default=0)
    stage = fields.CharEnumField(
        PositionStage, max_length=32, default=PositionStage.OPEN
    )
    posted_date = fields.DateField()
