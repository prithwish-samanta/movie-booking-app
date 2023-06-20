import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constants } from '../shared/constants';

interface Shows {
  theaterId: string;
  showTime: string;
  totalSeats: number;
}

export interface AddMovieRequest {
  title: string;
  description: string;
  releaseDate: string;
  runtime: number;
  genre: string;
  language: string;
  country: string;
  director: string;
  cast: string;
  rating: string;
  posterUrl: string;
  trailerUrl: string;
  shows: Shows[];
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  updateTicketStatus(ticketId: string, status: string) {
    return this.http
      .put(
        `${
          constants.ADMIN_SERVICE_URL
        }/update/${ticketId}/${status.toUpperCase()}`,
        {}
      )
      .pipe(catchError(this.handleError));
  }

  addNewMovie(movie: AddMovieRequest) {
    return this.http
      .post(`${constants.ADMIN_SERVICE_URL}/addmovie`, movie)
      .pipe(catchError(this.handleError));
  }

  deleteMovieById(id: string) {
    return this.http
      .delete(`${constants.ADMIN_SERVICE_URL}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
