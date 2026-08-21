from fastapi import APIRouter, Depends
from app.services.log_service import get_logs, get_weekly_activity
from app.schemas.log import ResponseLog, ResponseWeeklyActivity
from app.api.deps import get_current_user, require_admin

router = APIRouter(dependencies=[Depends(require_admin)])
public_router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponseLog])
async def log():
    return await get_logs()


@public_router.get("/weekly", response_model=list[ResponseWeeklyActivity])
async def weekly_activity():
    return await get_weekly_activity()
