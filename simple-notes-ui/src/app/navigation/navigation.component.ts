import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  showSearchBar: boolean;
  options = ["test", "test2", "twest3"];
  searchValue: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.startReceivingEvents();
  }

  startReceivingEvents() {
    this.dataService.currentPage.subscribe(page => page.includes('notes') ? this.showSearchBar = true : this.showSearchBar = false
    );
  }

  newNote() {
    //TODO: New note
  }

  onSearchChange(searchValue: string) {
    console.log(searchValue);
    //TODO: send call to backend to search for auto complete and fill the options array
  }

  selectedOption(searchValue: string) {
    console.log(searchValue);
    //TODO open the note with this content
  }

}
