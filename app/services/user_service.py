from app.repositories.user_repository import UserRepository

class UserService:

    def __init__(self, repo: UserRepository):
        self.repo = repo

    def create_user(self, db, email, password):
        # NOTE: hashing comes Day 2
        return self.repo.create(db, email, password)