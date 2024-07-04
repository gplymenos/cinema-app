import { Component, inject, OnInit, signal } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';

interface Summary {
  type: string;
  title: string;
  count: number;
}

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss',
})
export class DashboardSummaryComponent implements OnInit {
  cinemaService = inject(CinemaService);

  summaryData = signal<Summary[]>([
    { type: 'cinema', title: 'Cinemas', count: 0 },
    { type: 'screen', title: 'Screens', count: 0 },
    { type: 'movie', title: 'Movies', count: 0 },
    { type: 'booking', title: 'Bookings', count: 0 },
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
  }
}
