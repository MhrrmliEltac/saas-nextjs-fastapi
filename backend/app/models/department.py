from tortoise import models, fields


class DepartmentModel(models.Model):
    id = fields.UUIDField(pk=True)
    name = fields.TextField()
    head = fields.TextField()
