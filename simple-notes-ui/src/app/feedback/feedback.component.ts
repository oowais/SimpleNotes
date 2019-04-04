import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  url: string = 'http://127.0.0.1:5002/';

  submitFeedback(): void {
    if (!this.validation())
      return;

    this.http.post(this.url + 'feedback', this.model).subscribe(
      res => {
        this.alert("Feedback submitted", false);
        location.reload();
      },
      err => {
        this.alert("Server error", true);
      }
    );
  }
  validation(): any {
    if (this.model.email.trim() == '') {
      this.alert("Please enter email address", true);
      return false;
    }
    if (this.model.feedback.trim().length < 20) {
      this.alert("Feedback must be atleast 20 characters", true);
      return false;
    }
    return true;
  }

  submitFeedback2(): void {
    this.http.get(this.url + 'employees').subscribe(data => {
      let employeeData = data as JSON;
      console.log(employeeData);
    })
  }

  alert(text: string, error: boolean): void {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    config.panelClass = error ? ['error-toast'] : undefined;
    this.snackBar.open(text, 'Close', config);
  }
}

export interface FeedbackViewModel {
  name: string;
  email: string;
  feedback: string;
}