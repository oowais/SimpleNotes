import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

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

  constructor(private service: SharedService) { }

  ngOnInit() {
  }

  Save(title: string, text: string) {
    this.service.addNote(title, text).subscribe(
      res => {
        if (res.success == true) {
          this.service.alert('Note saved', false);
          // TODO: dont use location reload, instead refresh the notes component
          location.reload();
        }
      }
    )
  }
}
