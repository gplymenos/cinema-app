import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { apiUrl } from '../api';
import { Cinema, CinemaWithScreens, DataObject } from '../models/cinema.model';
import { GenericHttpService } from './generic-http.service';

export interface ICinemaService {
  addCinema(cinema: Cinema): Observable<Cinema>;
  getCinemaUpdates(): Observable<CinemaWithScreens[]>;
  getCinemasSnapshot(): CinemaWithScreens[];
}

@Injectable({
  providedIn: 'root',
})
export class CinemaService implements ICinemaService {
  private httpService = inject(GenericHttpService);
  private cinemas = new BehaviorSubject<CinemaWithScreens[]>([]);

  constructor() {
    this.loadCinemas();
  }

  private loadCinemas() {
    this.httpService
      .fetchData<DataObject<CinemaWithScreens>>(apiUrl + '/cinemas')
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

  getCinemaUpdates(): Observable<CinemaWithScreens[]> {
    return this.cinemas.asObservable();
  }

  getCinemasSnapshot(): CinemaWithScreens[] {
    return this.cinemas.getValue();
  }
}
