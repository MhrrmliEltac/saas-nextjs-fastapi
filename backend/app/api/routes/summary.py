from fastapi import APIRouter, Depends
from app.services.summary_service import get_summary
from app.schemas.summary import ResponseSummary
from app.api.deps import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/", response_model=ResponseSummary)
async def summary():
    return await get_summary()
