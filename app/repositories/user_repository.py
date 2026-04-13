from app.models.user import User

class UserRepository:

    def create(self, db, email, hashed_password):
        user = User(email=email, hashed_password=hashed_password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def get_by_email(self, db, email):
        return db.query(User).filter(User.email == email).first()
    
    def get_by_id(self, db, user_id):
        return db.query(User).filter(User.id == user_id).first()