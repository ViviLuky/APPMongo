import { Component, OnInit } from '@angular/core';
import {Imdb, Movie} from "../../common/movie";
import {MovieService} from "../../services/movie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  formMovie :FormGroup = this.formBuilder.group({
    imdb: this.formBuilder.group({
      rating:[0],
      votes: [0],
    }),
    _id: [''],
    title: [''],
    year: [2023],
    director: [''],
    plot: [''],
    poster:[''],
    genres: [''],
    __v:['']
  });
  movies: Movie[] = [];

 mynewGenre = new FormGroup({
   newGenre: new FormControl('')
 });
  genres: string[] = [];
  editar = false;
  movie: any;

  constructor(private movieService: MovieService,private  formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadMovies();
  }
   get title():any{
    return this.formMovie.get('title')?.value;
   }
  get year():any{
    return this.formMovie.get('year')?.value;
  }
  get director():any{
    return this.formMovie.get('director')?.value;
  }
  get plot():any{
    return this.formMovie.get('plot')?.value;
  }
  get genresF():any{
    return this.formMovie.get('genres')?.value;
  }
  get poster():any{
    return this.formMovie.get('poster')?.value;
  }
  get rating():any{
    return this.formMovie.get('imdb.rating')?.value;
  }
  get votes():any{
    return this.formMovie.get('imdb.votes')?.value;
  }
  get newGenre():any{
    return this.mynewGenre.get('newGenre')?.value;
  }


  private loadMovies() {
    this.movieService.getMovieList().subscribe((data) => {
      this.movies = data ;
    }
    );
     this.movieService.getGenres().subscribe(
       data => this.genres = data
     )
  }

  loadMovie(movie: Movie) {
    this.formMovie.setValue(movie);
    this.editar = true;

  }

  newMovie() {
   this.formMovie.reset();
   this.editar = false;
  }

  removeMovie(movie: Movie) {
    if(confirm('Desea Borrar'+movie.title+'?')){
      this.movieService.deleteMovie(movie._id).subscribe(
        data => this.loadMovies()
      );
    }
  }

  addNewGenre(newGenre: any) {
   let newGenres;
   if(!this.editar)this.genres.push(newGenre)
   else {
     newGenres = this.formMovie.getRawValue().genres;
     console.log(newGenres, newGenre);
     newGenres.push(newGenre);
     this.formMovie.setControl('genres',new FormControl(newGenres));
   }
   this.mynewGenre.reset();
  }

  onSubmit() {
   if(this.editar){
     const id = this.formMovie.getRawValue()._id;
     this.movieService.updateMovie(id,this.formMovie.getRawValue())
       .subscribe(data => this.loadMovies())
   }else{
     this.movieService.addMovie(this.formMovie.getRawValue())
       .subscribe(data => this.loadMovies());
   }
  }

}
