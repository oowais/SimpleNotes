import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
    private page = new BehaviorSubject<string>("default");
    currentPage = this.page.asObservable();

    constructor() { }

    changePage(pageName: string) {
        this.page.next(pageName);
    }
}
