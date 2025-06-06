from flask_smorest import Blueprint, abort
from flask.views import MethodView
from models.TaskModel import TaskModel
from schemas.TaskScheme import TaskSchema
from db import db

task_bp = Blueprint('Task', 'task', url_prefix = '/task')

@task_bp.route('/')
class BoardResources(MethodView):
    @task_bp.arguments(TaskSchema)
    @task_bp.response(200, TaskSchema(many=True))
    def get(self, owner):
        return TaskModel.query.filter_by(owner = owner).all()
    
    @task_bp.arguments(TaskSchema)
    @task_bp.response(201, TaskSchema)
    def post(self, data):
        new_task = TaskModel(**data)
        db.session.add(new_task)
        db.session.commit()
        return new_task