class Note:

    def __init__(self, id, note_text, last_edited):
        self.__id = id
        self.__note_text = note_text
        self.__last_edited = last_edited

    def get_id(self):
        return self.__id

    def get_note_text(self):
        return self.__note_text

    def get_last_edited(self):
        return self.__last_edited
