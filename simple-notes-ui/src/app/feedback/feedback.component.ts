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
    } else if (!this.emailVerify(this.model.email)) {
      this.alert("Please enter a valid email address", true);
      return false;
    }
    if (this.model.feedback.trim().length < 20) {
      this.alert("Feedback is too small, (try with 20 characters)", true);
      return false;
    }
    return true;
  }

  emailVerify(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailRes = regexp.exec(email);
    if (emailRes == null)
      return false;
    else if (emailRes.length > 0)
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