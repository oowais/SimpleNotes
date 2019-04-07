import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note';
import { SharedService } from '../shared/shared.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(
    private service: SharedService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.changePage(location.pathname);
    this.getAllNotes();
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
