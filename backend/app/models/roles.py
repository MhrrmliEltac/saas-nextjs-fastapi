from tortoise import models, fields


class Role(models.Model):
    id = fields.UUIDField(pk=True)
    name = fields.CharField(max_length=255, unique=True)
