import json

from flask import Flask, request
from flask_cors import CORS
from flask_jsonpify import jsonify
from flask_restful import Api, Resource

from db import Db

app = Flask(__name__)
api = Api(app)

CORS(app)
db = Db()


@app.route("/")
def hello():
    return jsonify({'text': 'Hello World!'})


@app.route("/feedback", methods=['POST'])
def feedback():
    data = request.data.decode("utf-8")
    dict = json.loads(data)
    print("Name: {}".format(dict.get("name")))
    print("Email: {}".format(dict.get("email")))
    print("Feedback: {}".format(dict.get("feedback")))
    return ""


class Employees(Resource):
    def get(self):
        return {'employees': [{'id': 1, 'name': 'Balram'}, {'id': 2, 'name': 'Tom'}]}


class EmployeesName(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id': 1, 'name': 'Balram'}}
        return jsonify(result)


api.add_resource(Employees, '/employees')  # Route_1
api.add_resource(EmployeesName, '/employees/<employee_id>')  # Route_3

if __name__ == '__main__':
    app.run(port=5002, debug=True)
