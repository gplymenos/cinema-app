import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddBookingComponent } from '../../dialogs/add-booking/add-booking.component';
import {
  CinemaWithScreens,
  DataObject,
  Screening,
} from '../../models/cinema.model';
import { CinemaService } from '../../services/cinema.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-cinema-screenings',
  standalone: true,
  imports: [DatePipe, MatButtonModule],
  templateUrl: './cinema-screenings.component.html',
  styleUrl: './cinema-screenings.component.scss',
})
export class CinemaScreeningsComponent implements OnInit, OnDestroy {
  dashboardService = inject(DashboardService);
  cinemaService = inject(CinemaService);
  groupedScreenings?: [string, Screening[]][] = [];
  selectedCinema?: CinemaWithScreens;
  screeningSubscription?: Subscription;
  dashboardSubscription?: Subscription;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dashboardSubscription = this.dashboardService
      .getSelectedCinema()
      .subscribe((selectedCinema: CinemaWithScreens | undefined) => {
        this.selectedCinema = selectedCinema;
        this.subscribeToScreenings();
      });

    this.cinemaService.screeningAdded.subscribe(() => {
      this.subscribeToScreenings();
    });
  }

  groupByMovieName(movies: Screening[]): [string, Screening[]][] {
    const groupedMovies = movies.reduce((acc, movieObject) => {
      const movieName = movieObject.movie.name;
      if (!acc[movieName]) {
        acc[movieName] = [];
      }
      acc[movieName].push(movieObject);
      return acc;
    }, {} as Record<string, Screening[]>);

    return Object.entries(groupedMovies);
  }

  subscribeToScreenings() {
    if (this.selectedCinema) {
      this.screeningSubscription?.unsubscribe();
      this.screeningSubscription = this.cinemaService
        .getCinemaScreenings(this.selectedCinema.id)
        .subscribe((data: DataObject<Screening>) => {
          this.groupedScreenings = this.groupByMovieName(data.content);
        });
    } else {
      this.groupedScreenings = [];
    }
  }

  openAddBooking(screeningId: number) {
    this.dialog.open(AddBookingComponent, {
      data: {
        title: 'Add Booking',
        selectedCinema: this.selectedCinema,
        selectedScreening: screeningId,
      },
    });
  }

  ngOnDestroy(): void {
    this.dashboardSubscription?.unsubscribe();
    this.screeningSubscription?.unsubscribe();
  }
}
