import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  securityQuestions = [
    { id: 1, question: 'What is your mother"s maiden name?' },
    { id: 2, question: 'What is your favorite color?' },
    { id: 3, question: 'What was the name of your first pet?' },
    { id: 4, question: 'In what city were you born?' },
    { id: 5, question: 'What is the name of your favorite teacher?' },
  ];

  userSubscription: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

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
}
