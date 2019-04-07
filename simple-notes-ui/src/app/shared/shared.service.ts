import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Observable, BehaviorSubject } from 'rxjs';

import { Note } from '../model/note';
import { FeedbackViewModel } from '../model/feedback';


@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private BASE_URL: string = 'http://127.0.0.1:5002/';

    private FEEDBACK_URL: string = this.BASE_URL + 'feedback';
    private GET_NOTES_URL: string = this.BASE_URL + 'notes';

    private searchValue = new BehaviorSubject<string>("");
    private page = new BehaviorSubject<string>("");

    currentSearchValue = this.searchValue.asObservable();
    currentPage = this.page.asObservable();

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    /**
   * @ngdoc function
   * @name getAllNotes
   * @description Get call to get all notes from server
   * @returns Observable<Note[]>
   */
    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.GET_NOTES_URL);
    }

    /**
   * @ngdoc function
   * @name submitFeedback
   * @description Post call to submit feedback to server
   * @param feedback
   * @returns Observable<any>
   */
    submitFeedback(feedback: FeedbackViewModel): Observable<any> {
        return this.http.post(this.FEEDBACK_URL, feedback);
    }

    /**
   * @ngdoc function
   * @name alert
   * @description Snack bar alert message
   * @param text Text to be displayed on alert snack bar
   * @param error If this alert is an error message or info
   */
    alert(text: string, error: boolean): void {
        let config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.horizontalPosition = 'center';
        config.duration = 2000;
        config.panelClass = error ? ['error-toast'] : undefined;
        this.snackBar.open(text, 'Close', config);
    }

    /**
   * @ngdoc function
   * @name changePage
   * @description Send event that page has changed
   * @param pageName
   */
    changePage(pageName: string) {
        this.page.next(pageName);
    }

    /**
   * @ngdoc function
   * @name changeSearchValue
   * @description Send event that search value has changed
   * @param search
   */
    changeSearchValue(search: string) {
        this.searchValue.next(search);
    }
}
