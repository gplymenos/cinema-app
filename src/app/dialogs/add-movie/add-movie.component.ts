import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Movie } from '../../models/cinema.model';
import { MovieService } from '../../services/movie.service';
import { AddDialogComponent } from '../../shared/add-dialog/add-dialog.component';
import { MyErrorStateMatcher } from '../../validation-helper';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    AddDialogComponent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent {
  // Services
  movieService = inject(MovieService);
  dialogRef = inject(MatDialogRef<AddDialogComponent>);

  //variables
  titleControl = new FormControl('', [Validators.required]);
  runtimeControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const movieTitle = this.titleControl.value;
    const movieRuntime = this.runtimeControl.value;
    if (movieTitle && movieRuntime) {
      const movie = {
        name: movieTitle,
        runtime: +movieRuntime,
      } as Movie;

      this.movieService.addMovie(movie).subscribe(() => {
        this.closeModal();
      });
    }
  }
}
