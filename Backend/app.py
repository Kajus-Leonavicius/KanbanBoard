from flask import Flask
from db import db
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_smorest import Api
from resources.BoardResources import Board_bp
from resources.UserResources import user_bp
from resources.TaskResources import task_bp
from resources.ColumnResources import column_bp
from models.UserModel import UserModel
from models.BoardModel import BoardModel
from models.TaskModel import TaskModel
from models.ColumnModel import ColumnModel
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["API_TITLE"] = 'User API'
app.config["API_VERSION"] = 'v1'
app.config["OPENAPI_VERSION"] = '3.0.3'
app.config["OPENAPI_URL_PREFIX"] = '/'
app.config["OPENAPI_SWAGGER_UI_PATH"] = '/docs'
app.config["OPENAPI_SWAGGER_UI_URL"] = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/'


app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://root@127.0.0.1:9000/Kanban'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = 'super-slaptas-raktas'



db.init_app(app)
#jwt = JWTManager(app)
migrate = Migrate(app, db)
api = Api(app)

api.register_blueprint(Board_bp)
api.register_blueprint(user_bp)
api.register_blueprint(task_bp)
api.register_blueprint(column_bp)

with app.app_context():
    db.create_all()
    
if __name__ == '__main__':
    app.run(debug = True)