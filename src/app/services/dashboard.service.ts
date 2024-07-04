import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CinemaWithScreens } from '../models/cinema.model';

export interface IDashboardService {
  setSelectedCinema(cinema: CinemaWithScreens): void;
  getSelectedCinema(): Observable<CinemaWithScreens | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService implements IDashboardService {
  private selectedCinema = new BehaviorSubject<CinemaWithScreens | undefined>(
    undefined
  );

  setSelectedCinema(cinema: CinemaWithScreens | undefined) {
    this.selectedCinema.next(cinema);
  }

  getSelectedCinema(): Observable<CinemaWithScreens | undefined> {
    return this.selectedCinema?.asObservable();
  }
}
