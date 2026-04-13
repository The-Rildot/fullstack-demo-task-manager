from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.auth import LoginRequest, Token
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.db.deps import get_db
from app.core.security import create_access_token

router = APIRouter()

def get_user_service():
    return UserService(UserRepository())

@router.post("/login", response_model=Token)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
    service: UserService = Depends(get_user_service)
):
    user = service.authenticate_user(db, data.email, data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    return {"access_token": token}