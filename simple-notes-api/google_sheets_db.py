import gspread
from oauth2client.service_account import ServiceAccountCredentials
import logging


class SheetsDb:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.__scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/drive",
        ]
        self.__cred = ServiceAccountCredentials.from_json_keyfile_name(
            "db/Simple-Notes-DB.json", self.__scope
        )

        self.__client = gspread.authorize(self.__cred)
        self.__sheet = self.__client.open("Simple Notes DB").sheet1

    def get_all_notes(self):
        try:
            records = self.__sheet.get_all_records()
        except IndexError:
            return None
        notes = []
        for d in records:
            notes.append(
                {
                    "id": d.get("id"),
                    "heading": d.get("heading"),
                    "note_text": d.get("note_text"),
                    "last_edited": d.get("last_edited"),
                }
            )
        return notes

    def get_filtered_notes(self, search_value):
        try:
            records = self.__sheet.get_all_records()
        except IndexError:
            return None
        notes = []
        for d in records:
            if (
                search_value.lower() in d.get("heading").lower()
                or search_value.lower() in d.get("note_text").lower()
            ):
                notes.append(
                    {
                        "id": d.get("id"),
                        "heading": d.get("heading"),
                        "note_text": d.get("note_text"),
                        "last_edited": d.get("last_edited"),
                    }
                )
        return notes

    def create_note(self, heading, note_text, last_edited):
        try:
            records = self.__sheet.get_all_records()
        except IndexError:
            records = None
        if records is None:
            index = 2
            curr_id = 1
        else:
            total_rows = self.__get_row_count()
            last_id = self.__get_note_id(total_rows)

            index = total_rows + 1
            curr_id = last_id + 1
        self.logger.info("Create note with id %d", curr_id)
        self.__sheet.insert_row([curr_id, heading, note_text, last_edited], index)

    def update_note(self, id, heading, note_text, last_edited):
        note_row = self.__get_note_row(id)
        if note_row is not None:
            self.logger.info("Update note %d", id)
            self.__sheet.update_cell(note_row, 2, heading)
            self.__sheet.update_cell(note_row, 3, note_text)
            self.__sheet.update_cell(note_row, 4, last_edited)
        else:
            self.logger.warning("Note %d not found!", id)
            self.create_note(heading, note_text, last_edited)

    def delete_note(self, id):
        note_row = self.__get_note_row(id)
        if note_row is None:
            self.logger.warning("Note %d not found! Cannot delete", id)
            return False
        else:
            self.__sheet.delete_row(note_row)
            self.logger.warning("Note %d deleted", id)
            return True

    def __get_note_row(self, id):
        records = self.__sheet.get_all_records()
        if records is None:
            return None
        # row is 2 since row 1 contains title
        row = 2
        for d in records:
            if id == d.get("id"):
                return row
            row += 1
        return None

    def __get_note_id(self, row):
        return int(self.__sheet.cell(row, 1).value)

    def __get_row_count(self):
        records = self.__sheet.get_all_records()
        if records is None:
            return 0
        return len(records) + 1
