import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Note } from '../model/note';
import { FeedbackViewModel } from '../model/feedback';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private BASE_URL: string = 'http://127.0.0.1:5002/';
    
    private FEEDBACK_URL: string = this.BASE_URL + 'feedback';
    private GET_NOTES_URL: string = this.BASE_URL + 'notes';

    constructor(private http: HttpClient) { }

    getAllNotes(): Observable<Note[]> {
        return null;
    }

    submitFeedback(feedback: FeedbackViewModel): Observable<any> {
        return null;
    }
}