from flask_smorest import Blueprint
from models.UserModel import UserModel
from schemas.UserSchema import UserSchema, UserLoginSchema
from flask.views import MethodView
from db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

user_bp = Blueprint('User', 'user', url_prefix = '/user')

@user_bp.route('/register')
class UserResources (MethodView):
    
    @user_bp.arguments(UserSchema)
    @user_bp.response(201, UserSchema)
    def post(self, data):
        password = data.pop('password')
        hashed_password = generate_password_hash(password)
        new_user  = UserModel( password = hashed_password, **data)
        db.session.add(new_user)
        db.session.commit()
        return new_user

@user_bp.route('/login')
class login(MethodView):
    
    @user_bp.arguments(UserLoginSchema)
    @user_bp.response(200, UserLoginSchema)
    def post (self, data):
        email = data['email']
        password = data.pop('password')
        user = UserModel.query.filter_by(email = email).first()
        
        if user and check_password_hash(user.password, password):
            
            access_token = create_access_token(identity=str(user.id))
            
            return {
                'id': user.id,
                'name': user.name,
                'surname': user.surname,
                'access_token': access_token,
            }