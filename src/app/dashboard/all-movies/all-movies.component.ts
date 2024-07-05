import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Movie } from '../../models/cinema.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.scss',
})
export class AllMoviesComponent implements OnInit {
  moviesService = inject(MovieService);
  movies: Movie[] = [];

  ngOnInit(): void {
    this.moviesService.getMovieUpdates().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }
}
