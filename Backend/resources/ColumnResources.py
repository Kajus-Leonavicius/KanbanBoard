from flask_smorest import Blueprint, abort
from flask.views import MethodView
from models.ColumnModel import ColumnModel
from schemas.ColumnSchema import ColumnSchema
from db import db

column_bp = Blueprint('Coluns', 'columns', url_prefix = '/boards')

@column_bp.route('/<int:board_id>/columns')
class ColumnResources(MethodView):
    @column_bp.response(200, ColumnSchema(many=True))
    def get(self, board_id):
        return ColumnModel.query.filter_by(board_id = board_id).all()
    
    @column_bp.arguments(ColumnSchema)
    @column_bp.response(201, ColumnSchema)
    def post(self, data, board_id):
        data.pop('board_id', None)
        new_column = ColumnModel(board_id = board_id, **data)
        db.session.add(new_column)
        db.session.commit()
        return new_column

@column_bp.route('/columns/<int:column_id>')
class SingleColumnResources(MethodView):
    
    @column_bp.response(204)
    def delete(self, board_id):
        columns = ColumnModel.query.get_or_404(board_id)
        db.session.delete(columns)
        db.session.commit()
        return ''