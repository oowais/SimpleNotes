import json
import datetime

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
    data = request.data.decode("utf-8")
    data_dict = json.loads(data)
    now = datetime.datetime.now()
    date = now.strftime("%d-%m-%Y %H:%M")
    db.create_note(heading=data_dict.get("heading"), note_text=data_dict.get("text"), last_edited=date)
    return jsonify(success=True)


@app.route('/notes/edit', methods=['POST'])
def edit_note():
    data = request.data.decode("utf-8")
    data_dict = json.loads(data)
    now = datetime.datetime.now()
    date = now.strftime("%d-%m-%Y %H:%M")
    print(data_dict.get("id"))
    print(data_dict.get("heading"))
    print(data_dict.get("text"))
    db.update_note(id=data_dict.get('id'), heading=data_dict.get('heading'), note_text=data_dict.get('text'),
                   last_edited=date)
    return jsonify(success=True)


@app.route('/notes/delete', methods=['POST'])
def delete_note():
    note_id = request.data.decode("utf-8")
    result = db.delete_note(int(note_id))
    if result is True:
        return jsonify(success=True)
    else:
        return jsonify("Note not found!", success=False)


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


if __name__ == '__main__':
    app.run(port=5002, debug=True)
