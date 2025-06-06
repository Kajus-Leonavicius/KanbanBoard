from flask_smorest import Blueprint
from models.UserModel import UserModel
from schemas.UserSchema import UserSchema
from flask.views import MethodView
from db import db

user_bp = Blueprint('User', 'user', url_prefix = '/user')

@user_bp.route('/')
class UserResources (MethodView):
    
    @user_bp.arguments(UserSchema)
    @user_bp.response(201, UserSchema)
    def post(self, data):
        
        new_user  = UserModel(**data)
        db.session.add(new_user)
        db.session.commit()
        return new_user