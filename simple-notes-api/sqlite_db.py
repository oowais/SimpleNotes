import logging
import sqlite3


class SqliteDb:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.__conn = sqlite3.connect('db/notes.db')
        self.__table_name = 'notes'
        self.create_table()

    def create_table(self):
        c = self.__conn.cursor()
        create_table = '''CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY,
                        heading text, note_text text, last_edited text)'''
        params = (self.__table_name,)
        c.execute(create_table)
        self.__conn.commit()
        c.close()

    def get_all_notes(self):
        try:
            records = []
            # fetch all notes from table
        except IndexError:
            return None
        notes = []
        for d in records:
            notes.append({'id': d.get('id'), 'heading': d.get('heading'), 'note_text': d.get('note_text'),
                          'last_edited': d.get('last_edited')})
        return notes

    def get_filtered_notes(self, search_value):
        try:
            records = []
            # fetch all notes from table
        except IndexError:
            return None
        notes = []
        for d in records:
            if search_value.lower() in d.get('heading').lower() or search_value.lower() in d.get('note_text').lower():
                notes.append({'id': d.get('id'), 'heading': d.get('heading'), 'note_text': d.get('note_text'),
                              'last_edited': d.get('last_edited')})
        return notes

    def create_note(self, heading, note_text, last_edited):
        # Fetch last id
        # Then increment it to make curr_id
        curr_id = 1
        self.logger.info('Create note with id %d', curr_id)
        # then insert in the table

    def update_note(self, id, heading, note_text, last_edited):
        # get the row with id and update other details
        pass

    def delete_note(self, id):
        # delete row with id matching
        pass
