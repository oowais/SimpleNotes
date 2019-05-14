import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pprint

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('db/Simple-Notes-DB.json', scope)
client = gspread.authorize(creds)

sheet = client.open('Simple Notes DB').sheet1

pp = pprint.PrettyPrinter()

# get all rows
results = sheet.get_all_records()
pp.pprint(results)

# get 1 row
row = sheet.row_values(2)
pp.pprint(row)

# get 1 col
col = sheet.col_values(2)
pp.pprint(col)

# get 1 cell
cell = sheet.cell(4, 3).value
pp.pprint(cell)

# update a cell
sheet.update_cell(4, 3, 'random text')

# get the updated cell
cell = sheet.cell(4, 3).value
pp.pprint(cell)

# insert a row
new_row = [4, 'sample note', 'its simple']
sheet.insert_row(new_row, 2)

# delete a row
sheet.delete_row(2)

# get row count
print(sheet.row_count)  # doesn't work
print(len(sheet.get_all_records()))  # proper way
