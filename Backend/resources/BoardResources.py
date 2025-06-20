from flask_smorest import Blueprint, abort
from flask.views import MethodView
from models.BoardModel import BoardModel
from schemas.BoardSchema import BoardSchema
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

Board_bp = Blueprint('Board', 'board', url_prefix = '/board')

@Board_bp.route('/')
class BoardResources(MethodView):
    
    @Board_bp.response(200, BoardSchema(many=True))
    @jwt_required()
    def get(self):
        owner = int(get_jwt_identity())
        return BoardModel.query.filter_by(owner = owner).all()
    
    @jwt_required()
    @Board_bp.arguments(BoardSchema)
    @Board_bp.response(201, BoardSchema)
    def post(self, data):
        owner = get_jwt_identity()
        new_board = BoardModel(**data, owner = owner)
        db.session.add(new_board)
        db.session.commit()
        return new_board

@Board_bp.route('/<int:board_id>')
class SingleBoardResources(MethodView):
    
    @Board_bp.arguments(BoardSchema)
    @Board_bp.response(201, BoardSchema)
    def put(self, updated_data, board_id):
        board = BoardModel.query.get_or_404(board_id)
        for key, value in updated_data.items():
            setattr(board, key, value)
        db.session.commit()
        return board
    
    @Board_bp.response(204)
    def delete(self, board_id):
        board = BoardModel.query.get_or_404(board_id)
        db.session.delete(board)
        db.session.commit()
        return ''