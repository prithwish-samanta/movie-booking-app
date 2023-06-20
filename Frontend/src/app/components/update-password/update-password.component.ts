import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  securityQuestions = constants.SECURITY_QUESTIONS;
  isLoading: boolean = false;

  updatePasswordForm = new FormGroup({
    securityQuestionId: new FormControl(1, [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  get securityQuestionId() {
    return this.updatePasswordForm.get('securityQuestionId');
  }

  get answer() {
    return this.updatePasswordForm.get('answer');
  }

  get newPassword() {
    return this.updatePasswordForm.get('newPassword');
  }

  onSubmit() {
    if (this.updatePasswordForm.valid) {
      this.isLoading = true;
      this.authenticationService
        .updatePassword({
          securityQuestionId: this.securityQuestionId?.value,
          answer: this.answer?.value,
          newPassword: this.newPassword?.value,
        })
        .subscribe({
          complete: () => {
            this.isLoading = false;
            this.openSnackBar('Your password updated successfully');
          },
          error: (errorMessage) => {
            this.isLoading = false;
            this.openSnackBar(errorMessage);
          },
        });
    }
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
    });
  }
}
