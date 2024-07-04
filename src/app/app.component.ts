import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CinemaListComponent } from './dashboard/cinema-list/cinema-list.component';
import { DashboardSummaryComponent } from './dashboard/dashboard-summary/dashboard-summary.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, DashboardSummaryComponent, CinemaListComponent],
})
export class AppComponent {}
