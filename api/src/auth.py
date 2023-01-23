from flask import Blueprint, request, jsonify
import validators
from src.constants.status_codes import HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN
from flask_expects_json import expects_json
from src.schema.authSchema import signup_schema, signin_schema
from src.database import User, db
from src.utils.helpers import encrypt, jwtToken
import bcrypt

auth = Blueprint("auth", __name__)

@auth.post("/signup")
@expects_json(signup_schema)
def signup():
    # input assign
    print(request.json.get('name'))
    name = request.json.get('name', '')
    email = request.json.get('email', '')
    password = request.json.get('password', '')
    role = request.json.get('role', '')
    print(email, role)
    if not validators.email(email):
        return jsonify({"error": 'Email is not valid'}), HTTP_400_BAD_REQUEST

    if(User.query.filter_by(email=email, role=role).first() is not None):
        return jsonify({"error": "Email with same role is already taken"}), HTTP_403_FORBIDDEN
    
    pwd_hash = encrypt(password)

    user = User(name=name, email=email, password=pwd_hash, role=role)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User signed up successfully', 'user': {'email': email, 'name': name}})

@auth.post("/signin")
@expects_json(signin_schema)
def sigin():
    # input assign
    email = request.json.get('email', '')
    password = request.json.get('password', '')
    role = request.json.get('role', '')
    user = User.query.filter_by(email=email, role=role).first()
    
    if not user:
        return jsonify({'error': 'Invalid email'}), HTTP_400_BAD_REQUEST
    
    if not bcrypt.checkpw(password.encode(), user.password): 
        return jsonify({'error': 'Password is incorrect' })

    payload = {
        "id": user.id,
        "email": user.email,
        "role": user.role
    }

    return jsonify({'token': jwtToken(payload), 'message': 'User signed up successfully', 'user': {'email': user.email, 'name': user.name}})