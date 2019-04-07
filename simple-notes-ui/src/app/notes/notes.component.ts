import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(
    private service: SharedService,
  ) { }

  ngOnInit() {
    this.service.changePage(location.pathname);
    this.getAllNotes();
    this.startFilterNotesService();
  }

  /**
   * @ngdoc function
   * @name startFilterNotesService
   * @description Get method to fetch notes according to filter
   */
  startFilterNotesService() {
    this.service.currentSearchValue.subscribe(val => {
      console.log(val);
      //TODO: send call to backend to search and show notes who has similar content in notes component
    });
  }

  /**
   * @ngdoc function
   * @name getAllNotes
   * @description Get method to fetch all notes from server
   */
  public getAllNotes(): void {
    this.service.getAllNotes().subscribe(
      data => {
        this.notes = data;
      });
  }

}
