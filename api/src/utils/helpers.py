import jwt
import bcrypt
from src.database import User

def encrypt(password):
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(password.encode(), salt)
    return hash

def jwtToken(payload):
    token= jwt.encode(
        payload = payload,
        key = "single random string", algorithm="HS256"
    )
    return token

def jwtVerify(payload):
    user = jwt.decode(payload.split(" ")[1], "single random string", algorithms="HS256" )
    user_details = User.query.filter_by(email=user['email'], role=user['role']).first()
    return user_details