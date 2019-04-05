import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FeedbackViewModel } from '../model/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedback: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };

  url: string = 'http://127.0.0.1:5002/';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  /**
   * @ngdoc function
   * @name submitFeedback
   * @description sends post call to server with feedback data
   */
  submitFeedback(): void {
    if (!this.validation())
      return;

    this.http.post(this.url + 'feedback', this.feedback).subscribe(
      res => {
        this.alert("Feedback submitted", false);
        location.reload();
      },
      err => {
        this.alert("Server error", true);
      }
    );
  }

  /**
   * @ngdoc function
   * @name validation
   * @description Validates if content in feedback is proper or not
   * @returns boolean
   */
  validation(): boolean {
    if (this.feedback.email.trim() == '') {
      this.alert("Please enter email address", true);
      return false;
    } else if (!this.emailVerify(this.feedback.email)) {
      this.alert("Please enter a valid email address", true);
      return false;
    }
    if (this.feedback.feedback.trim().length < 20) {
      this.alert("Feedback is too small, (try with 20 characters)", true);
      return false;
    }
    return true;
  }

  /**
   * @ngdoc function
   * @name emailVerify
   * @description Verifies email against regex
   * @param email
   * @returns boolean
   */
  emailVerify(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailRes = regexp.exec(email);
    if (emailRes == null)
      return false;
    else if (emailRes.length > 0)
      return true;
  }

  /**
   * @ngdoc function
   * @name alert
   * @description Snack bar alert message
   * @param text
   * @param error
   */
  alert(text: string, error: boolean): void {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    config.panelClass = error ? ['error-toast'] : undefined;
    this.snackBar.open(text, 'Close', config);
  }
}
