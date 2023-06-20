import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddMovieRequest, AdminService } from 'src/app/services/admin.service';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent {
  availableTheaters = constants.AVAILABLE_THEATERS;
  isLoading = false;

  addMovieRequest: AddMovieRequest = {
    title: '',
    description: '',
    releaseDate: '',
    runtime: 0.0,
    genre: '',
    language: '',
    country: '',
    director: '',
    cast: '',
    rating: '',
    posterUrl: '',
    trailerUrl: '',
    shows: [],
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  addTheater() {
    this.addMovieRequest.shows.push({
      theaterId: '',
      showTime: '',
      totalSeats: 0,
    });
  }

  removeTheater(index: number) {
    this.addMovieRequest.shows.splice(index, 1);
  }

  submitMovieForm() {
    this.addMovieRequest.shows.forEach((show) => {
      const theater = this.availableTheaters.find(
        (t) => t.id === show.theaterId
      );
      if (theater) {
        show.theaterId = theater.id;
      }
    });
    console.log(this.addMovieRequest);
    this.isLoading = true;
    this.adminService.addNewMovie(this.addMovieRequest).subscribe({
      complete: () => {
        this.isLoading = false;
        this.openSnackBar('Movie added successfully');
        this.router.navigate(['/admin/manage-movies']);
      },
      error: (errorMsg) => {
        this.isLoading = false;
        this.openSnackBar(errorMsg);
      },
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
    });
  }
}
