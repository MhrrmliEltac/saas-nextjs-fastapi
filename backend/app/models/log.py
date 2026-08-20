from tortoise import models, fields


class Log(models.Model):
    id = fields.UUIDField(pk=True)
    actor = fields.TextField()
    action = fields.TextField()
    target = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)
