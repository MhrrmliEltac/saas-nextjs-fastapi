from fastapi import APIRouter, Depends
from app.services.log_service import get_logs
from app.schemas.log import ResponseLog
from app.api.deps import require_admin

router = APIRouter(dependencies=[Depends(require_admin)])


@router.get("/list", response_model=list[ResponseLog])
async def log():
    return await get_logs()
