from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from src.auth import auth
from src.vacation import vacation
from werkzeug.exceptions import HTTPException
from jsonschema import ValidationError
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:root@db:3306/vacation_management"
print(os.environ.get("SQLALCHEMY_DB_URI"), "URI")
print(app, "App")

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.Integer, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def __repr__(self) -> str:
        return 'User>>> {self}'

class Vacation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vacation_name = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def __repr__(self) -> str:
        return 'Vacation>>> {self}'


db.app = app
db.init_app(app)
with app.app_context():
    print("db create all")
    db.create_all()
@app.errorhandler(400)
def handleValidationError(e):
    if isinstance(e.description, ValidationError):
        original_error = e.description
        return jsonify({'error': original_error.message}), 400
@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    print("500")
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify({"error": str(e)}), code

print("Running")

app.register_blueprint(auth)
app.register_blueprint(vacation)

app.run(host="0.0.0.0")

# def create_app(test_config=None):
#     app = Flask(__name__, instance_relative_config=True)
#     print(os.environ.get("SQLALCHEMY_DB_URI"))
#     if test_config is None:
#         app.config.from_mapping(
#             SECRET_KEY=os.environ.get("SECRET_KEY"),
#             SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI")
#         )
#     else:
#         app.config.from_mapping(test_config)

#     db.app = app
#     db.init_app(app)

#     with app.app_context():
#         db.create_all()

#     @app.errorhandler(400)
#     def handleValidationError(e):
#         if isinstance(e.description, ValidationError):
#             original_error = e.description
#             return jsonify({'error': original_error.message}), 400

#     @app.errorhandler(Exception)
#     def handle_error(e):
#         code = 500
#         print("500")
#         if isinstance(e, HTTPException):
#             code = e.code
#         return jsonify({"error": str(e)}), code

#     app.register_blueprint(auth)
#     app.register_blueprint(vacation)
#     if __name__ == '__main__':
#         app.run(host='0.0.0.0', port=5000)

#     return app
