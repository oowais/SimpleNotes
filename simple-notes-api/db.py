import gspread
from oauth2client.service_account import ServiceAccountCredentials
from data_structure.note import Note


class Db:

    def __init__(self):
        self.__scope = ['https://spreadsheets.google.com/feeds',
                        'https://www.googleapis.com/auth/drive']
        self.__cred = ServiceAccountCredentials.from_json_keyfile_name(
            'Simple Notes DB-bd23117225f3.json', self.__scope)
        self.__client = gspread.authorize(self.__cred)
        self.__sheet = self.__client.open('Simple Notes DB').sheet1

    def get_all_notes(self):
        try:
            records = self.__sheet.get_all_records()
        except IndexError:
            return None
        notes = []
        for d in records:
            note = Note(d.get('id'), d.get('note_text'), d.get('last_edited'))
            notes.append(note)
        return notes

    def create_note(self, note_text, last_edited):
        try:
            records = self.__sheet.get_all_records()
        except IndexError:
            records = None
        if records is None:
            index = 2
        else:
            index = len(records) + 2
        print('index: ', index)
        self.__sheet.insert_row([index - 1, note_text, last_edited], index)

    def update_note(self, id, note_text, last_edited):
        note_id = self.__get_note_id(id)
        print(note_id)
        if note_id is not None and note_id == id:
            self.__sheet.update_cell(id + 1, 2, note_text)
            self.__sheet.update_cell(id + 1, 3, last_edited)
        else:
            self.create_note(note_text, last_edited)

    def __get_note_id(self, id):
        row = self.__sheet.row_values(id + 1)
        if len(row) == 0:
            return None
        else:
            return row[0]
