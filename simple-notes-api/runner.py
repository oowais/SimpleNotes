from google_sheets_db import SheetsDb
import logging

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    db = SheetsDb()

    notes = db.get_all_notes()
    print(notes)
