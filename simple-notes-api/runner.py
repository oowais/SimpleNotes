from db import Db

if __name__ == '__main__':
    db = Db()

    db.create_note("asf", "sdf")
    db.update_note(4, "hello", "text")
    # db.get_note(2)

    notes = db.get_all_notes()
    # for note in notes:
    #     print(note.get_note_text())
