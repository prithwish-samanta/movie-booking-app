import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  USER_AUTH_SERVICE_URL: string = 'http://localhost:8081/api/v1.0/moviebooking';
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(loginCredentials: { email: any; password: any }) {
    return this.http
      .post<User>(this.USER_AUTH_SERVICE_URL + '/login', loginCredentials)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.storeUser(response);
          this.user.next(response);
        })
      );
  }

  signup(signupCredentials: {
    firstName: any;
    lastName: any;
    email: any;
    password: any;
    secretQuestionId: any;
    answerToSecretQuestion: any;
  }) {
    return this.http
      .post<any>(this.USER_AUTH_SERVICE_URL + '/register', signupCredentials)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.router.navigate(['/login']);
        })
      );
  }

  forgotPassword(
    userId: any,
    forgotPasswordRequest: {
      securityQuestionId: any;
      answer: any;
      newPassword: any;
    }
  ) {
    return this.http
      .put<any>(
        `${this.USER_AUTH_SERVICE_URL}/${userId}/forgot`,
        forgotPasswordRequest
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.router.navigate(['/login']);
        })
      );
  }

  autoLogin() {
    const user = localStorage.getItem('authData');
    if (!user) return;

    const parsedUser: User = JSON.parse(user);
    if (parsedUser.jwtToken) {
      this.user.next(parsedUser);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['./login']);
    this.removeUser();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }

  private storeUser(user: User) {
    localStorage.setItem('authData', JSON.stringify(user));
  }

  private removeUser() {
    localStorage.removeItem('authData');
  }
}
