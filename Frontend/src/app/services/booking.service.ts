import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookingService {
  BOOKING_SERVICE_URL: string = 'http://localhost:8083/api/v1.0/moviebooking';

  constructor(private http: HttpClient) {}

  bookTicket(ticketBookRequest: { showingId: string; seats: number }) {
    return this.http
      .post(`${this.BOOKING_SERVICE_URL}/book`, ticketBookRequest)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
