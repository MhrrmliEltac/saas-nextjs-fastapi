from enum import Enum

from tortoise import models, fields


class ReviewStatus(str, Enum):
    COMPLETED = "completed"
    IN_PROGRESS = "in_progress"


class PerformanceReview(models.Model):
    id = fields.UUIDField(pk=True)
    employee = fields.TextField()
    period = fields.TextField()
    reviewer = fields.TextField()
    score = fields.FloatField(default=0)
    status = fields.CharEnumField(
        ReviewStatus, max_length=32, default=ReviewStatus.IN_PROGRESS
    )
