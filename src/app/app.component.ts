import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { AllMoviesComponent } from './dashboard/all-movies/all-movies.component';
import { CinemaListComponent } from './dashboard/cinema-list/cinema-list.component';
import { CinemaScreeningsComponent } from './dashboard/cinema-screenings/cinema-screenings.component';
import { DashboardSummaryComponent } from './dashboard/dashboard-summary/dashboard-summary.component';
import { AddBookingComponent } from './dialogs/add-booking/add-booking.component';
import { AddCinemaComponent } from './dialogs/add-cinema/add-cinema.component';
import { AddMovieComponent } from './dialogs/add-movie/add-movie.component';
import { AddScreenComponent } from './dialogs/add-screen/add-screen.component';
import { CinemaWithScreens } from './models/cinema.model';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatCardModule,
    RouterOutlet,
    DashboardSummaryComponent,
    CinemaListComponent,
    MatButtonModule,
    MatIcon,
    AllMoviesComponent,
    CinemaScreeningsComponent,
  ],
})
export class AppComponent implements OnInit {
  selectedCinema?: CinemaWithScreens;
  dialog = inject(MatDialog);
  dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.getSelectedCinema().subscribe((selectedCinema) => {
      this.selectedCinema = selectedCinema;
    });
  }

  openAddCinema() {
    this.openModal(AddCinemaComponent, 'Add Cinema');
  }

  openAddScreen() {
    this.openModal(AddScreenComponent, 'Add Screen');
  }

  openAddBooking() {
    this.openModal(AddBookingComponent, 'Add Booking');
  }

  openAddMovie() {
    this.openModal(AddMovieComponent, 'Add Movie');
  }

  openModal(componentType: ComponentType<unknown>, title: string) {
    const dialogRef = this.dialog.open(componentType, {
      data: {
        title: title,
        selectedCinema: this.selectedCinema,
      },
    });
  }
}
