from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.task import TaskCreate, TaskRead
from app.services.task_service import TaskService
from app.repositories.task_repository import TaskRepository
from app.db.deps import get_db

router = APIRouter()

def get_task_service():
    return TaskService(TaskRepository())

# Temporary hardcoded user_id (replace with auth on Day 2)
@router.post("/", response_model=TaskRead)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    service: TaskService = Depends(get_task_service)
):
    return service.create_task(db, task, user_id=1)

@router.get("/", response_model=list[TaskRead])
def get_tasks(
    db: Session = Depends(get_db),
    service: TaskService = Depends(get_task_service)
):
    return service.get_tasks(db, user_id=1)