import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from app.core.config import settings
from app.api.routes import user as user_router
from app.api.routes import roles as roles_router
from app.api.routes import department as department_router
from app.api.routes import worker as worker_router
from app.api.routes import leave as leave_router
from app.api.routes import summary as summary_router
from app.api.routes import log as log_router

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
app.include_router(worker_router.router, prefix="/worker", tags=["Worker"])
app.include_router(leave_router.router, prefix="/leave", tags=["Leave"])
app.include_router(summary_router.router, prefix="/summary", tags=["Summary"])
app.include_router(log_router.router, prefix="/log", tags=["Log"])

register_tortoise(
    app,
    db_url=settings.DATABASE_URL,
    modules={
        "models": [
            "app.models.user",
            "app.models.roles",
            "app.models.department",
            "app.models.worker",
            "app.models.leave",
            "app.models.log",
        ]
    },
    generate_schemas=True,
    add_exception_handlers=True,
)
