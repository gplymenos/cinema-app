import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
export class CinemaScreeningsComponent implements OnInit {
  dashboardService = inject(DashboardService);
  cinemaService = inject(CinemaService);
  groupedScreenings?: [string, Screening[]][];

  ngOnInit(): void {
    this.dashboardService
      .getSelectedCinema()
      .subscribe((selectedCinema: CinemaWithScreens | undefined) => {
        if (selectedCinema) {
          this.cinemaService
            .getCinemaScreenings(selectedCinema.id)
            .subscribe((data: DataObject<Screening>) => {
              console.log('screenings');
              console.log(data);
              console.log(this.groupByMovieName(data.content));
              this.groupedScreenings = this.groupByMovieName(data.content);
            });
        }
      });
  }

  groupByMovieName(movies: Screening[]) {
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
}
