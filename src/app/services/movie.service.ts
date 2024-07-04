import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DataObject, Movie } from '../models/cinema.model';
import { GenericHttpService } from './generic-http.service';

export interface IMovieService {
  addMovie(movie: Movie): Observable<Movie>;
  getMovieUpdates(): Observable<Movie[]>;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService implements IMovieService {
  private httpService = inject(GenericHttpService);
  private movies = new BehaviorSubject<Movie[]>([]);

  constructor() {
    this.loadMovies();
  }

  private loadMovies() {
    this.httpService.fetchData<DataObject<Movie>>('/movies').subscribe({
      next: (data: DataObject<Movie>) => {
        this.movies.next(data.content);
      },
      error: (error) => {
        // Error handling goes here
      },
    });
  }

  addMovie(movie: Movie) {
    return this.httpService.createData('/movies', movie).pipe(
      map((data) => {
        this.loadMovies();
        return data;
      })
    );
  }

  getMovieUpdates(): Observable<Movie[]> {
    return this.movies.asObservable();
  }
}
