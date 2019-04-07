import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

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
    private service: SharedService
  ) { }

  ngOnInit() {
    this.startReceivingEvents();
  }

  startReceivingEvents() {
    this.service.currentPage.subscribe(page => page.includes('feedback') ? this.showSearchBar = false : this.showSearchBar = true
    );
  }

  newNote() {
    //TODO: New note component-- make it!
  }

  onSearchChange(searchValue: string) {
    this.service.changeSearchValue(searchValue);
  }

}
