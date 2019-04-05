from db import Db
import logging

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    db = Db()

    notes = db.get_all_notes()
    print(notes)
