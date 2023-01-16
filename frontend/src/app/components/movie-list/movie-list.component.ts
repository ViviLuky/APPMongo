import { Component, OnInit } from '@angular/core';
import {Movie} from "../../common/movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  private movieService: any;
  movie: any;

  constructor() { }

  ngOnInit(): void {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getMovieList().subcribe((data:[]) => {
      this.movies = data ;
    })
  }

  loadMovie(movie: Movie) {
    
  }

  newMovie() {
    
  }

  removeMovie(movie: Movie) {
    
  }
}
