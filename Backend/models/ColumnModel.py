from db import db
class ColumnModel(db.Model):
    
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(255))
    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)