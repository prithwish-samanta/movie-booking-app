import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
})
export class BookTicketComponent {
  isSuccess = false;
  isError = false;
  errMessage = '';
  isLoading = false;
  seatsToBook: number = 1;

  constructor(
    public dialogRef: MatDialogRef<BookTicketComponent>,
    private ticketBookService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: { showId: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  bookTickets(): void {
    if (this.seatsToBook > 0) {
      this.isLoading = true;
      this.ticketBookService
        .bookTicket({
          showingId: this.data.showId,
          seats: this.seatsToBook,
        })
        .subscribe({
          complete: () => {
            this.isLoading = false;
            this.isSuccess = true;
          },
          error: (errorMsg) => {
            this.isLoading = false;
            this.errMessage = errorMsg;
            this.isError = true;
          },
        });
    }
  }
}
