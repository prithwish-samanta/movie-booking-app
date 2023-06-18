import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MovieService } from 'src/app/services/movie.service';
import { BookTicketComponent } from '../book-ticket/book-ticket.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  isLoading: boolean = false;
  movieId: string | null = '';
  movie: Movie | null = null;
  userSubscription: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private movieService: MovieService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movieId = this.activeRoute.snapshot.paramMap.get('movieId');
    if (this.movieId) {
      this.isLoading = true;
      this.movieService.getMovieById(this.movieId).subscribe({
        next: (movie: Movie) => {
          this.isLoading = false;
          this.movie = movie;
        },
        error: (errorMessage) => {
          this.isLoading = false;
          this.openSnackBar(errorMessage);
          this.router.navigate(['/home']);
        },
      });
    } else {
      this.openSnackBar('movie id is undefined');
      this.router.navigate(['/home']);
    }
  }

  bookTicket(id: string) {
    this.userSubscription = this.authenticationService.user.subscribe(
      (user) => {
        if (user?.role === 'ADMIN') {
          this.openSnackBar("You don't have permission to perform this action");
        } else if (user?.role === 'CUSTOMER') this.openDialog(id);
        else this.router.navigate(['/login']);
      }
    );
  }

  openDialog(showId: string) {
    const dialogRef = this.dialog.open(BookTicketComponent, {
      width: '300px',
      data: { showId: showId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openSnackBar(result);
      }
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
