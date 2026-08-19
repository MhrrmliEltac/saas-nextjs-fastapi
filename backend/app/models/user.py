from tortoise import models, fields


class User(models.Model):
    id = fields.UUIDField(pk=True)
    name = fields.TextField()
    surname = fields.TextField()
    email = fields.CharField(max_length=255, unique=True)
    password = fields.CharField(max_length=255)
    role = fields.ForeignKeyField(
        "models.Role",
        related_name="users",
        on_delete=fields.RESTRICT,
    )
