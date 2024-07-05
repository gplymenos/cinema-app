import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CinemaWithScreens, Movie } from '../../models/cinema.model';
import { CinemaService } from '../../services/cinema.service';
import { DashboardService } from '../../services/dashboard.service';
import { MovieService } from '../../services/movie.service';
import { AddDialogComponent } from '../../shared/add-dialog/add-dialog.component';
import { MyErrorStateMatcher } from '../../validation-helper';

@Component({
  selector: 'app-add-screening',
  standalone: true,
  imports: [
    AddDialogComponent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-screening.component.html',
  styleUrl: './add-screening.component.scss',
})
export class AddScreeningComponent implements OnInit {
  // Services
  cinemaService = inject(CinemaService);
  movieService = inject(MovieService);
  dashboardService = inject(DashboardService);
  dialogRef = inject(MatDialogRef<AddDialogComponent>);

  //variables
  startTimeControl = new FormControl('', [Validators.required]);
  movieControl = new FormControl('', [Validators.required]);
  screenControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  selectedCinema?: CinemaWithScreens;
  allMovies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getMovieUpdates().subscribe((movies) => {
      this.allMovies = movies;
    });

    this.dashboardService.getSelectedCinema().subscribe((selectedCinema) => {
      this.selectedCinema = selectedCinema;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const screeningTime = new Date(this.startTimeControl.value!);
    const screenId = this.screenControl.value;
    const movieId = this.movieControl.value;
    if (this.selectedCinema && screenId && movieId) {
      this.cinemaService
        .addScreening(this.selectedCinema?.id, screenId, movieId, screeningTime)
        .subscribe((data) => {
          this.closeModal();
        });
    }
  }
}
