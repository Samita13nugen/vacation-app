FROM python:3.9.7

COPY ./requirements.txt /api/requirements.txt

WORKDIR api

RUN pip install -r requirements.txt

COPY . /api

ENV FLASK_APP=src

ENV FLASK_ENV=development

ENV SQLALCHEMY_DB_URI=mysql+mysqlconnector://root:root@db:3306/vacation_management

EXPOSE 5000

CMD ["python", "./run.py"]