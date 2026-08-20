import uuid
from fastapi import APIRouter, status, Depends
from app.services.worker_service import (
    create_worker,
    get_worker,
    get_worker_by_id,
    worker_list_length,
    update_worker,
    delete_worker,
)
from app.schemas.success import SuccessResponse
from app.schemas.worker import RequestWorker, ResponseWorker, RequestUpdateWorker
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])


@router.get("/list", response_model=list[ResponseWorker])
async def worker():
    return await get_worker()


@router.get("/count", response_model=int)
async def worker():
    return await worker_list_length()


@router.get("/{id}", response_model=ResponseWorker)
async def worker(id: uuid.UUID):
    return await get_worker_by_id(id)


@router.post(
    "/create", status_code=status.HTTP_201_CREATED, response_model=SuccessResponse
)
async def worker(
    payload: RequestWorker, current_user: User = Depends(get_current_user)
):
    return await create_worker(
        payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.put("/update/{id}", response_model=SuccessResponse)
async def worker(
    id: uuid.UUID,
    payload: RequestUpdateWorker,
    current_user: User = Depends(get_current_user),
):
    return await update_worker(
        id, payload, actor=f"{current_user.name} {current_user.surname}"
    )


@router.delete("/delete/{id}", response_model=SuccessResponse)
async def worker(id: uuid.UUID, current_user: User = Depends(get_current_user)):
    return await delete_worker(id, actor=f"{current_user.name} {current_user.surname}")
