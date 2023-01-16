import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../common/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseURI = 'http://localhost:3000/api/movies/';

  constructor(private http: HttpClient) { }

  getMovieList(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseURI)
  }
}
