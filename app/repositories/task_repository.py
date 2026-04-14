from http.client import HTTPException

from app.models.task import Task

class TaskRepository:

    def create(self, db, task_data, user_id):
        task = Task(**task_data.dict(), user_id=user_id)
        db.add(task)
        db.commit()
        db.refresh(task)
        return task
    
    def update(self, db, task_id, updated, user_id):
        task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        if updated.title is not None:
            task.title = updated.title

        if updated.completed is not None:
            task.completed = updated.completed

        db.commit()
        db.refresh(task)

        return task
    
    def delete(self, db, task_id, user_id):
        task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        db.delete(task)
        db.commit()

    def get_by_user(self, db, user_id):
        return db.query(Task).filter(Task.user_id == user_id).all()