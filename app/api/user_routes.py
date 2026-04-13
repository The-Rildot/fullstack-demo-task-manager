from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserRead
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.db.deps import get_db

router = APIRouter()

def get_user_service():
    return UserService(UserRepository())

@router.post("/", response_model=UserRead)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    service: UserService = Depends(get_user_service)
):
    return service.create_user(db, user.email, user.password)