from flask import Blueprint, request, jsonify
from flask_expects_json import expects_json
from src.schema.vacation import vacation_schema, fetch_vacation_schema
from src.utils.helpers import jwtVerify
from src.constants.status_codes import HTTP_403_FORBIDDEN
from src.database import Vacation, db
from datetime import datetime

vacation = Blueprint("vacation", __name__)

@vacation.post('/get_vacations')
def fetchVacations():
    vacation_name = request.json.get('vacation_name', '')
    start_date = request.json.get('start_date', '')
    end_date = request.json.get('end_date', '')

    if not request.headers['authorization']:
        return jsonify({'error' : 'you are not authorized, please signin again.'})
    
    user = jwtVerify(request.headers['authorization'])
    if user == None or user.role is not 1:
        return jsonify({'error': 'you are not authorized, please signin again.' }), HTTP_403_FORBIDDEN
    
    vacations = []
    if(vacation_name is not ""):
        # print("HERER")
        vacations = Vacation.query.filter_by(vacation_name=vacation_name)
    elif(start_date is not ""):
        # print("HERERE**")
        y1, m1, d1 = start_date.split("-")
        vacations = Vacation.query.filter(Vacation.start_date >= datetime(int(y1), int(m1), int(d1)))
    elif(end_date is not ""):
        print("HERERE")
        y1, m1, d1 = end_date.split("-")
        vacations = Vacation.query.filter(Vacation.end_date <= datetime(int(y1), int(m1), int(d1)))
    elif(start_date is not "" and end_date is not ""):
        # print("HERERE")
        y1, m1, d1 = start_date.split("-")
        y2, m2, d2 = end_date.split("-")
        vacations = Vacation.query.filter_by(Vacation.start_date.between(datetime(int(y1), int(m1), int(d1)), datetime(int(y2), int(m2), int(d2))))
    else:
        # print("HERERE")
        vacations = Vacation.query.filter_by()
    print(vacations)
    data = []
    for vacation in vacations:
        vacation_data = {"vacation_name": vacation.vacation_name.decode("utf-8"), "start_date": vacation.start_date, "end_date": vacation.end_date}
        data.append(vacation_data)
    print(data, "Data***")

    return jsonify({"message": "Vacation fetched successfully", "data": data})

@vacation.post('/add_vacation')
def addVacation():
    vacation_name = request.json.get('vacation_name', '')
    start_date = request.json.get('start_date', '')
    end_date = request.json.get('end_date', '')
    y1, m1, d1 = start_date.split("-")
    y2, m2, d2 = end_date.split("-")
    if not request.headers['authorization']:
        return jsonify({'error' : 'you are not authorized, please signin again.'})
    
    user = jwtVerify(request.headers['authorization'])
    # if user == None or user.role is not 2:
    #     return jsonify({'error': 'you are not authorized, please signin again.' }), HTTP_403_FORBIDDEN
    
    vacation = Vacation(vacation_name=vacation_name, start_date=datetime(int(y1), int(m1), int(d1)), end_date=datetime(int(y2), int(m2), int(d2)))
    db.session.add(vacation)
    db.session.commit()

    return {"message": "Vacation added successfully"}