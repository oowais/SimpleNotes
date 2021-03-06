import logging
import sqlite3


class SqliteDb:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.__conn = sqlite3.connect("db/notes.db", check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        try:
            c = self.__conn.cursor()
            create_table = """CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY,
                            heading text, note_text text, last_edited text)"""
            c.execute(create_table)
            self.__conn.commit()
            c.close()
        except sqlite3.Error as e:
            self.logger.error("Database error: %s" % e)

    def get_all_notes(self):
        try:
            c = self.__conn.cursor()
            get_notes = """SELECT * FROM notes"""
            c.execute(get_notes)
            self.__conn.commit()
            records = c.fetchall()
            c.close()
            notes = []
            for d in records:
                notes.append(
                    {
                        "id": d[0],
                        "heading": d[1],
                        "note_text": d[2],
                        "last_edited": d[3],
                    }
                )
            return notes
        except sqlite3.Error as e:
            self.logger.error("Database error: %s" % e)
            return None

    def get_filtered_notes(self, search_value):
        try:
            c = self.__conn.cursor()
            filter_notes = (
                """SELECT * FROM notes WHERE heading LIKE ? OR note_text LIKE ?"""
            )
            params = ("%" + search_value + "%", "%" + search_value + "%")
            c.execute(filter_notes, params)
            self.__conn.commit()
            records = c.fetchall()
            c.close()
            notes = []
            for d in records:
                notes.append(
                    {
                        "id": d[0],
                        "heading": d[1],
                        "note_text": d[2],
                        "last_edited": d[3],
                    }
                )
            return notes
        except sqlite3.Error as e:
            self.logger.error("Database error: %s" % e)
            return None

    def create_note(self, heading, note_text, last_edited):
        try:
            c = self.__conn.cursor()
            create = (
                """INSERT INTO notes(heading,note_text,last_edited) VALUES (?,?,?)"""
            )
            params = (heading, note_text, last_edited)
            c.execute(create, params)
            self.__conn.commit()
            c.close()
            self.logger.info("Node Created")
        except sqlite3.Error as e:
            self.logger.error("Database error: %s" % e)
            return None

    def update_note(self, id, heading, note_text, last_edited):
        try:
            c = self.__conn.cursor()
            update = (
                """UPDATE notes SET heading= ?, note_text=?, last_edited=? WHERE id=?"""
            )
            params = (heading, note_text, last_edited, id)
            c.execute(update, params)
            c.fetchall()
            self.__conn.commit()
            c.close()
            self.logger.info("Node %d updated", id)
        except sqlite3.Error as e:
            self.logger.error("Database error: %s" % e)
            return None

    def delete_note(self, id):
        try:
            c = self.__conn.cursor()
            delete = """DELETE FROM notes WHERE id=?"""
            params = (id,)
            c.execute(delete, params)
            print(c.fetchall())
            self.__conn.commit()
            c.close()
            self.logger.info("Node %d deleted", id)
            return True
        except sqlite3.Error as e:
            self.logger.error("Database error: %s" % e)
            return None
