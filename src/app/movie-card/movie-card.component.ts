// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  //receive movie input data from the view
  @Input() Genre = { Name: '', Description: '' };

  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }
  checkIfFavClicked: boolean = false;
  iconType: string = 'favorite_border';

  //confirm if movie is already in user's favourite list
  checkIfMovieIsFavourite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
  }

  //function to confirm if movie is in user's favourites list
  isFavourite(movieId: any): boolean {
    if (this.fetchApiData.isFavoriteMovie(movieId)) {
      return true;
    } else {
      return false;
    }
  }

  changeFavIcon() {
    this.checkIfFavClicked = !this.checkIfFavClicked;
    if (this.checkIfFavClicked) {
      this.iconType = 'favorite';
    } else {
      this.iconType = 'favorite_border';
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //get details of movie genre
  getMovieGenre(genre: any): void {
    console.log(genre);

    this.dialog.open(MovieGenreComponent, {
      data: {
        genre,
      },
      width: '280px',
    });
  }

  //get details of movie director
  getMovieDirector(director: any): void {
    console.log(director);
    this.dialog.open(MovieDirectorComponent, {
      data: {
        director,
      },
      width: '380px',
    });
  }

  //get details of Synopsis of movie
  getMovieDescription(details: string): void {
    console.log(details);
    this.dialog.open(MovieDetailsComponent, {
      data: details,
      width: '480px',
    });
  }

  //add movie to list of favourites
  addToFavourites(): void {
    this.changeFavIcon();
  }

  //navigate to profile page
  toProfilePage(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  //function to remove movies from user's favourite list
  deleteMovieFromFavourite(movie: any): void {
    if (this.isFavourite(movie._id)) {
      if (confirm("Delete movie from favourite's list?")) {
        this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe({
          next: (response) => {
            console.log(
              'Movie deleted from favourites successfully.',
              response
            ); alert("movie deleted successfully from favourite's list")
          },
          error: (error) =>
            {console.error('Error deleting movie from favourites:', error); alert('There is an error')},
        });
      }
    } else {
      console.log('Movie not in your Favourites list');
      alert('Movie not in your Favourites list');
    }
  }

  //function to add movies to user's favourite list
  addMovieToFavourite(movie: any): void {
    if (!this.isFavourite(movie._id)) {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe({
        next: (response) => {console.log(response); alert("Movie added successfully to Favourite's list")},
        error: (error) => console.log(error),
      });
    } else {
      console.log('movie already on favourite list');
      alert('movie already on favourite list');
    }
  }

  toggleFavouriteMovies(movie: any): void {
    if (this.isFavourite(movie._id)) {
      this.deleteMovieFromFavourite(movie);
    } else {
      this.addMovieToFavourite(movie);
    }
  }
}


 