from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.task import TaskCreate, TaskRead
from app.services.task_service import TaskService
from app.repositories.task_repository import TaskRepository
from app.db.deps import get_db
from app.api.deps import get_current_user

router = APIRouter()

def get_task_service():
    return TaskService(TaskRepository())

@router.post("/", response_model=TaskRead)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    service: TaskService = Depends(get_task_service),
    current_user = Depends(get_current_user)
):
    return service.create_task(db, task, user_id=current_user.id)


@router.get("/", response_model=list[TaskRead])
def get_tasks(
    db: Session = Depends(get_db),
    service: TaskService = Depends(get_task_service),
    current_user = Depends(get_current_user)
):
    return service.get_tasks(db, user_id=current_user.id)