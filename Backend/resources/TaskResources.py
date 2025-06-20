from flask_smorest import Blueprint, abort
from flask.views import MethodView
from models.TaskModel import TaskModel
from schemas.TaskScheme import TaskSchema, TaskUpdateSchema
from db import db

task_bp = Blueprint('Task', 'task', url_prefix = '/task')

@task_bp.route('/<int:column_id>')
class TaskResources(MethodView):
    @task_bp.response(200, TaskSchema(many=True))
    def get(self,column_id):
        return TaskModel.query.filter_by(column_id = column_id).all()
    
    @task_bp.arguments(TaskSchema)
    @task_bp.response(201, TaskSchema)
    def post(self, data, column_id):
        new_task = TaskModel( **data)
        db.session.add(new_task)
        db.session.commit()
        return new_task
    
@task_bp.route('/<int:task_id>')
class SingleTaskResources(MethodView):
    
    @task_bp.arguments(TaskUpdateSchema)
    @task_bp.response(201, TaskUpdateSchema)
    def put(self, updated_data, task_id):
        task = TaskModel.query.get_or_404(task_id)
        for key, value in updated_data.items():
            setattr(task, key, value)
        db.session.commit()
        return task