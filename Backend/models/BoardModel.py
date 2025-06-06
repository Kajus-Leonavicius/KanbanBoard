from db import db
from sqlalchemy.sql import func

class BoardModel(db.Model):
    __tablename__ = 'board'
    
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone = True), server_default=func.now())
    owner = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)