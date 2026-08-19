from tortoise import models, fields


class Worker(models.Model):
    id = fields.UUIDField(pk=True)
    fullname = fields.CharField(max_length=255)

