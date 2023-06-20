import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constants } from '../shared/constants';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  bookTicket(ticketBookRequest: { showingId: string; seats: number }) {
    return this.http
      .post(`${constants.BOOKING_SERVICE_URL}/book`, ticketBookRequest)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
