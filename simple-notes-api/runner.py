from db import Db
import logging

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    db = Db()

    db.delete_note(1)
    db.update_note(3, "AAAA3", "A3")
    # db.get_note(2)

    notes = db.get_all_notes()
    # for note in notes:
    #     print(note.get_note_text())
