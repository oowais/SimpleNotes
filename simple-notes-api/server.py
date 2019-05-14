import json
import datetime
import logging

from flask import Flask, request
from flask_cors import CORS
from flask_jsonpify import jsonify
from flask_restful import Api
from pathlib import Path

from google_sheets_db import SheetsDb
from sqlite_db import SqliteDb

app = Flask(__name__)
api = Api(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CORS(app)

json_file = Path("db/Simple-Notes-DB.json")
if json_file.is_file():
    db = SheetsDb()
    logger.info("Using Google Sheets as DB")
else:
    db = SqliteDb()
    logger.info("Using local DB")


@app.route("/notes", methods=["GET"])
def get_notes():
    search = request.args.get("search", default=None, type=str)
    if search is not None:
        return jsonify(db.get_filtered_notes(search))
    else:
        return jsonify(db.get_all_notes())


@app.route("/notes/add", methods=["POST"])
def add_note():
    data = request.data.decode("utf-8")
    data_dict = json.loads(data)
    now = datetime.datetime.now()
    date = now.strftime("%d-%m-%Y %H:%M")
    db.create_note(
        heading=data_dict.get("heading"),
        note_text=data_dict.get("text"),
        last_edited=date,
    )
    return jsonify(success=True)


@app.route("/notes/edit", methods=["POST"])
def edit_note():
    data = request.data.decode("utf-8")
    data_dict = json.loads(data)
    now = datetime.datetime.now()
    date = now.strftime("%d-%m-%Y %H:%M")
    db.update_note(
        id=data_dict.get("id"),
        heading=data_dict.get("heading"),
        note_text=data_dict.get("text"),
        last_edited=date,
    )
    return jsonify(success=True)


@app.route("/notes/delete", methods=["POST"])
def delete_note():
    note_id = request.data.decode("utf-8")
    result = db.delete_note(int(note_id))
    if result is True:
        return jsonify(success=True)
    else:
        return jsonify("Error in deleting!", success=False)


@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.data.decode("utf-8")
    data_dict = json.loads(data)
    print("Name: {}".format(data_dict.get("name")))
    print("Email: {}".format(data_dict.get("email")))
    print("Feedback: {}".format(data_dict.get("feedback")))
    return jsonify(success=True)
    # if failed: send this
    # return jsonify("some error", success=False)


if __name__ == "__main__":
    """
    Check if simple notes db is present(meaning Google sheets db is setup)
    If not use sqlite
    """
    app.run(port=5002, debug=True)
