import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent {
  movieForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      runtime: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
      language: ['', Validators.required],
      country: ['', Validators.required],
      director: ['', Validators.required],
      cast: ['', Validators.required],
      rating: ['', Validators.required],
      posterUrl: ['', Validators.required],
      trailerUrl: ['', Validators.required],
      theaters: this.formBuilder.array([]),
    });
  }

  get theaterControls() {
    return this.movieForm.get('theaters') as FormArray;
  }

  addTheater() {
    const theaterGroup = this.formBuilder.group({
      name: ['', Validators.required],
      showtimeDate: ['', Validators.required],
      availableSeats: ['', Validators.required],
      totalSeats: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.theaterControls.push(theaterGroup);
  }

  removeTheater(index: number) {
    this.theaterControls.removeAt(index);
  }

  submitMovie() {
    if (this.movieForm.valid) {
      // Perform movie submission logic here
      console.log(this.movieForm.value);
    } else {
      // Form is invalid, display error messages
      this.movieForm.markAllAsTouched();
    }
  }

  cancel() {
    // Perform cancel logic here
    console.log('Cancelled');
  }
}
