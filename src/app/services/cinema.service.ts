import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  Cinema,
  CinemaWithScreens,
  DataObject,
  Screen,
  Screening,
} from '../models/cinema.model';
import { GenericHttpService } from './generic-http.service';

export interface ICinemaService {
  addCinema(cinema: Cinema): Observable<Cinema>;
  addScreen(cinemaId: number, screen: Screen): Observable<Screen>;
  getCinemaUpdates(): Observable<CinemaWithScreens[]>;
  getCinemaScreenings(cinemaId: number): Observable<DataObject<Screening>>;
}

@Injectable({
  providedIn: 'root',
})
export class CinemaService implements ICinemaService {
  private httpService = inject(GenericHttpService);
  private cinemas = new BehaviorSubject<CinemaWithScreens[]>([]);
  screeningAdded = new BehaviorSubject<null>(null);

  constructor() {
    this.loadCinemas();
  }

  private loadCinemas() {
    this.httpService
      .fetchData<DataObject<CinemaWithScreens>>('/cinemas')
      .subscribe({
        next: (data: DataObject<CinemaWithScreens>) => {
          this.cinemas.next(data.content);
        },
        error: (error) => {
          // Error handling goes here
        },
      });
  }

  addCinema(cinema: Cinema) {
    return this.httpService.createData('/cinemas', cinema).pipe(
      map((data) => {
        this.loadCinemas();
        return data;
      })
    );
  }

  addScreen(cinemaId: number, screen: Screen) {
    return this.httpService
      .createData('/cinemas/' + cinemaId + '/screens', screen)
      .pipe(
        map((data) => {
          this.loadCinemas();
          return data;
        })
      );
  }

  addScreening(
    cinemaId: number,
    screenId: string,
    movieId: string,
    startTime: Date
  ) {
    return this.httpService
      .createData(
        '/cinemas/' + cinemaId + '/screens/' + screenId + '/screenings',
        { movieId: movieId, startTime: startTime }
      )
      .pipe(
        map((data) => {
          this.screeningAdded.next(null);
          return data;
        })
      );
  }

  getCinemaUpdates(): Observable<CinemaWithScreens[]> {
    return this.cinemas.asObservable();
  }

  getCinemaScreenings(cinemaId: number): Observable<DataObject<Screening>> {
    return this.httpService.fetchData('/cinemas/' + cinemaId + '/screenings');
  }
}
