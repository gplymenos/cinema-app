import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CinemaWithScreens } from '../../models/cinema.model';
import { CinemaService } from '../../services/cinema.service';
import { DashboardService } from '../../services/dashboard.service';
import { AddDialogComponent } from '../../shared/add-dialog/add-dialog.component';

@Component({
  selector: 'app-cinema-list',
  standalone: true,
  templateUrl: './cinema-list.component.html',
  styleUrl: './cinema-list.component.scss',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddDialogComponent,
    MatExpansionModule,
  ],
})
export class CinemaListComponent {
  cinemas: CinemaWithScreens[] = [];
  cinemaService = inject(CinemaService);
  dashboardService = inject(DashboardService);
  selectedCinema?: CinemaWithScreens;
  @ViewChild('accordionEl') accordionEl!: ElementRef;

  ngOnInit(): void {
    this.cinemaService.getCinemaUpdates().subscribe({
      next: (cinemas) => {
        this.cinemas = cinemas;
      },
    });
  }

  cinemaSelected(cinema: CinemaWithScreens) {
    setTimeout(() => {
      const expandedAccordion = [
        ...this.accordionEl.nativeElement.children,
      ].some((child: HTMLElement) => child.classList.contains('mat-expanded'));

      this.dashboardService.setSelectedCinema(
        expandedAccordion ? cinema : undefined
      );
    }, 100);
  }
}
