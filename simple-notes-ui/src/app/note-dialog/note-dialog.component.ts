import { Component, OnInit, Inject } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../model/note';

@Component({
  selector: 'note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {
  id: number;
  heading: string;
  noteText: string;
  lastEdited: string;
  // TODO Use note interface instead of all the fields listed above
  note: Note;
  spinner: boolean = false;

  constructor(
    private service: SharedService,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note) { }

  ngOnInit() {
    console.log(this.id);
    console.log(this.heading);
    console.log(this.noteText);
    console.log(this.lastEdited);
  }

  save(title: string, text: string) {
    if (!this.validate(title, text)) {
      this.service.alert('Enter some text', true);
      return;
    }
    this.spinner = true;
    this.service.addNote(title, text).subscribe(
      res => {
        if (res.success == true) {
          this.service.alert('Note saved', false);
          // TODO: dont use location reload, instead refresh the notes component
          location.reload();
          this.spinner = false;
        }
      }
    )
  }

  cancel(): void {
    this.dialogRef.close();
  }

  validate(title: string, text: string): boolean {
    let isValid: boolean = false;
    if (undefined != text) {
      if (text.trim().length > 0) {
        isValid = true;
      }
    }

    if (undefined != title) {
      if (title.trim().length > 0) {
        isValid = true;
      }
    }
    return isValid;
  }
}
