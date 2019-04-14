import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { MatDialog } from '@angular/material';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  showSearchBar: boolean;
  searchValue: string;

  constructor(
    private service: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.startReceivingEvents();
  }

  startReceivingEvents() {
    this.service.currentPage.subscribe(page => page.includes('feedback') ? this.showSearchBar = false : this.showSearchBar = true
    );
  }

  newNote() {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      data: {heading: '', note_text: ''}
    });
  }

  onSearchChange(searchValue: string) {
    this.service.changeSearchValue(searchValue);
  }

}
