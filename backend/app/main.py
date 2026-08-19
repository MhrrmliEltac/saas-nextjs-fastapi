from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from app.api.routes import user as user_router
from app.api.routes import roles as roles_router
from app.api.routes import department as department_router
from app.core.config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router, prefix="/auth", tags=["Authentication"])
app.include_router(roles_router.router, prefix="/roles", tags=["Roles"])
app.include_router(department_router.router, prefix="/department", tags=["Department"])

register_tortoise(
    app,
    db_url=settings.DATABASE_URL,
    modules={"models": ["app.models.user", "app.models.roles", "app.models.department"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
