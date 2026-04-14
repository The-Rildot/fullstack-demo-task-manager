from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine

from app.api import user_routes, task_routes
from app.api import auth_routes

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(task_routes.router, prefix="/tasks", tags=["Tasks"])
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])