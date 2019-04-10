import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  Save(){
    // TODO: complete this. most important for this repo.
    console.log(this.heading);
  }
}
