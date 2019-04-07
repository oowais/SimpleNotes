# Simple Notes - Backend

- Python 3 required
- Run `pip3 install -r requirements.txt` to install dependencies first
- Run server.py for server

## Setup Google sheets as the database for this python application
This application uses Google sheets as the database
Follow the procedure to add your own DB file in the root of simple-notes-api
- Go to [Developers Google ](https://console.developers.google.com/)
- Click on `Create Project`
- Name it anything you want
- Now in Library menu(which will be selected be default) search for `Google drive api` and click on it
- Enable it
- `Create credentials`
- Questions
  - Which API are you using? `Google Drive API`
  - Where will you be calling this API from? `Web server`
  - What data will you be accessing? `Application data`
  - Are you using Google App Engine or Google Compute Engine? `No`
  - Click `What credentials do I need?` button
  - Input a `Service account name` if your choice
  - Assign role `Project -> editor`
  - Key Type `Json`
  - Click `Contuinue`
- Now json file be downloaded
- Save this file in root of simple-notes-api
- ###### Keep this json file private!
- Rename it to `Simple-Notes-DB.json` (I added it in .gitignore) so you don't upload this to the github by chance
- Go back to [Developers Google ](https://console.developers.google.com/) and enable `Google Sheets Api` for the same project
- Now open `Simple-Notes-DP.json`
- Copy the property value of `client_email`
- Now crate a new sheet in google drive
- To make sure the database works properly, edit the following cells
  - Cell A1: `id`
  - Cell B1: `heading`
  - Cell C1: `note_text`
  - Cell D1: `last_edited`
- Click on `Share` button on top-right, and paste that `client_email` from the json file
- Now you should be able to use server.py to access data from Google sheets
- [Reference Video- Google Sheets and Python by Twilio](https://www.youtube.com/watch?v=vISRn5qFrkM)
