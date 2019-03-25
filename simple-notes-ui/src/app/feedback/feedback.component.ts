import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitFeedback(): void {
    let url = "http://localhost:8080/api/feedback";
    this.http.post(url, this.model).subscribe(
      res => {
        alert("Feedback submitted");
        location.reload();
      },
      err => {
        alert("Error has occured!");
      }
    );
  }

}

export interface FeedbackViewModel {
  name: String;
  email: String;
  feedback: String;
}