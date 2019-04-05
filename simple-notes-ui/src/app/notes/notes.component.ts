import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../model/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  url: string = 'http://127.0.0.1:5002/';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllNotes();
  }

  /**
   * @ngdoc function
   * @name getAllNotes
   * @description Get method to fetch all notes from server
   */
  public getAllNotes(): void {
    this.http.get<Note[]>(this.url + 'notes').subscribe(data => {
      this.notes = data;
    })
  }

}
