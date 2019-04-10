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
    this.filterNotes();
  }

  /**
   * @ngdoc function
   * @name filterNotes
   * @description Get method to fetch notes according to filter
   */
  filterNotes() {
    this.service.currentSearchValue.subscribe(val => {
      if ("" != val)
        this.service.getFilteredNotes(val).subscribe(
          data => {
            this.notes = data;
          }
        );
      else this.getAllNotes();
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

  delete(id: number): void {
    this.service.deleteById(id).subscribe(
      msg => {
        if (true == msg.success){
          this.service.alert('Note deleted!', false);
          this.getAllNotes();
        }
        else
          this.service.alert(msg, true);
      },
      err => {
        console.log(err);
      }
    )
  }

}
