import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

interface AllMovieResponse {
  movies: Movie[];
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  MOVIE_CATALOG_SERVICE_URL: string =
    'http://localhost:8082/api/v1.0/moviebooking';

  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http
      .get<AllMovieResponse>(this.MOVIE_CATALOG_SERVICE_URL + '/all')
      .pipe(catchError(this.handleError));
  }

  getMovieById(id: string) {
    return this.http
      .get<Movie>(`${this.MOVIE_CATALOG_SERVICE_URL}/movies/search/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
