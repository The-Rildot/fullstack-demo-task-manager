from app.repositories.task_repository import TaskRepository

class TaskService:

    def __init__(self, repo: TaskRepository):
        self.repo = repo

    def create_task(self, db, task_data, user_id):
        return self.repo.create(db, task_data, user_id)
    
    def update_task(self, db, task_id, updated, user_id):
        return self.repo.update(db, task_id, updated, user_id)
    
    def delete_task(self, db, task_id, user_id):
        self.repo.delete(db, task_id, user_id)

    def get_tasks(self, db, user_id):
        return self.repo.get_by_user(db, user_id)