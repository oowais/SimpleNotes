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


@app.route("/notes", methods=['GET'])
def get_notes():
    search = request.args.get('search', default=None, type=str)
    if search is not None:
        return jsonify(db.get_filtered_notes(search))
    else:
        return jsonify(db.get_all_notes())


@app.route('/notes/add', methods=['POST'])
def add_note():
    pass


@app.route('/notes/update', methods=['POST'])
def update_note():
    pass


@app.route('/notes/delete', methods=['POST'])
def delete_note():
    note_id = request.data.decode("utf-8")
    result = db.delete_note(int(note_id))
    if result is True:
        return jsonify(success=True)
    else:
        return jsonify("Note not found in database!", success=False)


@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.data.decode("utf-8")
    data_dict = json.loads(data)
    print("Name: {}".format(data_dict.get("name")))
    print("Email: {}".format(data_dict.get("email")))
    print("Feedback: {}".format(data_dict.get("feedback")))
    return jsonify(success=True)
    # if failed: send this
    # return jsonify("some error", success=False)


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
