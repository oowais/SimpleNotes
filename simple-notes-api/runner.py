from db import Db
import logging

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    db = Db()

    db.create_note("asf", "sdf")
    db.update_note(7, "awf", "text")
    # db.get_note(2)

    notes = db.get_all_notes()
    # for note in notes:
    #     print(note.get_note_text())
