from app.models.task import Task

class TaskRepository:

    def create(self, db, task_data, user_id):
        task = Task(**task_data.dict(), user_id=user_id)
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    def get_by_user(self, db, user_id):
        return db.query(Task).filter(Task.user_id == user_id).all()