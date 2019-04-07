import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  showSearchBar: boolean;

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

}
