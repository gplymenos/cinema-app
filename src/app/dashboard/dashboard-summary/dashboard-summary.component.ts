import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { BookingService } from '../../services/booking.service';
import { CinemaService } from '../../services/cinema.service';
import { MovieService } from '../../services/movie.service';

interface Summary {
  type: string;
  title: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss',
})
export class DashboardSummaryComponent implements OnInit {
  cinemaService = inject(CinemaService);
  bookingService = inject(BookingService);
  movieService = inject(MovieService);

  summaryData = signal<Summary[]>([
    { type: 'cinema', title: 'Cinemas', icon: 'account_balance', count: 0 },
    { type: 'screen', title: 'Screens', icon: 'movie', count: 0 },
    { type: 'movie', title: 'Movies', icon: 'theaters', count: 0 },
    { type: 'booking', title: 'Bookings', icon: 'book_online', count: 0 },
  ]);

  ngOnInit(): void {
    this.cinemaService.getCinemaUpdates().subscribe((data) => {
      const screenCount = data.reduce(
        (res, cinema) => res + cinema.screens.length,
        0
      );
      this.summaryData()[0].count = data.length;
      this.summaryData()[1].count = screenCount;
    });

    this.bookingService.getBookingUpdates().subscribe((data) => {
      console.log('bookings');
      console.log(data);
      this.summaryData()[3].count = data.length;
    });

    this.movieService.getMovieUpdates().subscribe((data) => {
      this.summaryData()[2].count = data.length;
    });
  }
}
