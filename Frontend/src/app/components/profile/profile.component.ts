import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userId: string = '';
  firstName: string = '';
  lastName: string = '';
  role: string = '';
  email: string = '';

  userSubscription: Subscription = new Subscription();
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.userSubscription = this.authenticationService.user.subscribe(
      (user) => {
        if (user) {
          this.userId = user.userId;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.role = user.role;
          this.email = user.email;
        }
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
