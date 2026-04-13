from app.repositories.user_repository import UserRepository
from app.core.security import hash_password

class UserService:

    def __init__(self, repo: UserRepository):
        self.repo = repo

    def create_user(self, db, email, password):
        hashed = hash_password(password)
        return self.repo.create(db, email, hashed)

    def authenticate_user(self, db, email, password):
        user = self.repo.get_by_email(db, email)
        if not user:
            return None

        from app.core.security import verify_password
        if not verify_password(password, user.hashed_password):
            return None

        return user