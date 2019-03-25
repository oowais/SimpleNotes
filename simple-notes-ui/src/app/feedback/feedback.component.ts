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

  url: String = 'http://127.0.0.1:5002/';

  submitFeedback1(): void {
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

  submitFeedback(): void {
    this.http.get(this.url + 'employees').subscribe(data => {
      let employeeData = data as JSON;
      console.log(employeeData);
    })
  }

}

export interface FeedbackViewModel {
  name: String;
  email: String;
  feedback: String;
}