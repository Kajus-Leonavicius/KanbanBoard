from db import db 
from sqlalchemy.sql import func

class TaskModel(db.Model):
    __tablename__ = 'task'
    
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    status = db.Column(db.String(255))
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    created_at = db.Column(db.DateTime(timezone=True), server_default = func.now())
    column_id = db.Column(db.Integer, db.ForeignKey('column.id'), nullable = False)