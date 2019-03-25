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

  url: string = 'http://127.0.0.1:5002/';

  submitFeedback(): void {
    this.http.post(this.url + 'feedback', this.model).subscribe(
      res => {
        alert("Feedback submitted");
        location.reload();
      },
      err => {
        alert("Error has occured!");
      }
    );
  }

  submitFeedback2(): void {
    this.http.get(this.url + 'employees').subscribe(data => {
      let employeeData = data as JSON;
      console.log(employeeData);
    })
  }

}

export interface FeedbackViewModel {
  name: string;
  email: string;
  feedback: string;
}