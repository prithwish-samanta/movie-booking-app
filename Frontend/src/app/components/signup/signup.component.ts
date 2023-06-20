import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  securityQuestions = constants.SECURITY_QUESTIONS;
  isLoading: boolean = false;

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmedPassword: new FormControl('', [Validators.required]),
    secretQuestionId: new FormControl(1, [Validators.required]),
    answerToSecretQuestion: new FormControl('', [Validators.required]),
  });

  userSubscription: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmedPassword() {
    return this.signupForm.get('confirmedPassword');
  }

  get secretQuestionId() {
    return this.signupForm.get('secretQuestionId');
  }

  get answerToSecretQuestion() {
    return this.signupForm.get('answerToSecretQuestion');
  }

  ngOnInit() {
    this.userSubscription = this.authenticationService.user.subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['./home']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      if (this.password?.value !== this.confirmedPassword?.value) {
        this.openSnackBar('Password and Confirm Password must be same!');
        return;
      }

      this.isLoading = true;
      this.authenticationService
        .signup({
          firstName: this.firstName?.value,
          lastName: this.lastName?.value,
          email: this.email?.value,
          password: this.password?.value,
          answerToSecretQuestion: this.answerToSecretQuestion?.value,
          secretQuestionId: this.secretQuestionId?.value,
        })
        .subscribe({
          complete: () => {
            this.isLoading = false;
            this.openSnackBar('Your account has been created successfully');
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
